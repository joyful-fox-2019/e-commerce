const Cart = require('../models/cart');
const Product = require('../models/product');
const mongoose = require('mongoose')

module.exports = {
  getCart (req, res, next) {
    const UserId = req.loggedUser.id;
    Cart.findOne({ UserId }).populate({
      path: 'UserId',
      model: 'users'
    })
      .then(cart => {
        console.log(cart)
        res.status(200).json({ cart })
      })
      .catch(next)
  },
  addToCart (req, res, next) {
    const { product_image, description, name, price, id, count, storeName, stock } = req.body
    const payload = { product_image, description, name, price, id, count, storeName, stock};
    const UserId = req.loggedUser.id;
    let pass = true;
    let maxCount = true;
    let tempCart
    if(!count) next({status:400, msg: 'miss qty, please input qty'})
    else {
      Cart.findOne({ UserId })
        .then(cart => {
          tempCart = cart
          return Product.findById(id)
        })
        .then(product => {
          tempCart.product.forEach((el, i) => {
            if(el.name == name) {
              let math = Number(el.count) + Number(count)
              if(math <= product.stock) {
                pass = false;
                el.count = math;
              } else if(math > product.stock){
                pass = false;
                maxCount = false;
                el.count = product.stock
              }
            }
          })
          if(!pass) {
            return Cart.findOneAndUpdate({ UserId }, { product: tempCart.product }, {new: true})
          } else if (pass && count <= product.stock) {
            return Cart.findOneAndUpdate({ UserId }, { $push: { product: payload } }, {new: true})
          } else if (pass && count > product.stock) {
            maxCount = false;
            const newPayload = { ...payload }
            newPayload.count = product.stock
            return Cart.findOneAndUpdate({ UserId }, { $push: { product: newPayload } }, {new: true})
          }
        })
        .then(cart => {
          if(!pass || !maxCount) {
            res.status(201).json({msg: 'Out of stock, automaticly add max stock', cart})
          } else if(maxCount) {
            res.status(201).json({msg: 'success add to cart', cart})
          }
        })
        .catch(next)
    }
  },

  removeCart (req, res, next) {
    const UserId = req.loggedUser.id
    const name = req.params.name;
    Cart.findOne({ UserId })
      .then(cart => {
        for(let i=0; i<cart.product.length; i++) {
          if(cart.product[i].name == name) {
            cart.product.splice(i, 1)
          }
        }
        return Cart.findOneAndUpdate({ UserId }, { product: cart.product }, {new: true})
      })
      .then(cart => {
        res.status(200).json({ cart })
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