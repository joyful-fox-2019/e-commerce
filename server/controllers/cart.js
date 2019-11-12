const Cart = require('../models/cart');
const Product = require('../models/product');

module.exports = {
  getCart (req, res, next) {
    const UserId = req.loggedUser.id;
    Cart.findOne({ UserId }).populate('UserId').populate('ProductId')
      .then(cart => {
        res.status(200).json({ cart })
      })
      .catch(next)
  },
  addToCart (req, res, next) {
    const { product_image, description, name, price, id, count } = req.body
    const payload = { product_image, description, name, price, id, count };
    const UserId = req.loggedUser.id;
    let pass = true;
    let maxCount = true;
    let tempCart
    Cart.findOne({ UserId })
      .then(cart => {
        tempCart = cart
        return Product.findById(id)
      })
      .then(product => {
        tempCart.product.forEach((el, i) => {
          if(el.name == name) {
            let math = Number(el.count) + Number(count)
            if(el.id == id && math <= product.stock) {
              pass = false;
              el.count = math;
            } else if(el.id == id && math > product.stock){
              pass = false;
              maxCount = false;
              el.count = product.stock
            }
          }
        })
        if(!pass) {
          return Cart.findOneAndUpdate({ UserId }, { product: tempCart.product }, {new: true})
        } else if (pass && count <= product.stock) {
          return Cart.findOneAndUpdate({ UserId }, { $push: { product: payload, count }}, {new: true})
        } else if (pass && count > product.stock) {
          return Cart.findOneAndUpdate({ UserId }, { $push: { product: payload, count: product.stock }}, {new: true})
        }
      })
      .then(cart => {
        if(!pass && !maxCount) {
          res.status(201).json({msg: 'Out of stock, automaticly add max stock', cart})
        } else {
          res.status(201).json({msg: 'success add to cart', cart})
        }
      })
      .catch(next)
  },



  checkout (UserId) {
    return new Promise ((resolve, reject) => {
      const product = []
      Cart.findOneAndUpdate({ UserId }, { product }, {new: true})
        .then((cart) => {
          resolve(cart)
        })
        .catch(reject)
    })
  }
}