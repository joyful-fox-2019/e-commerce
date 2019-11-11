const Cart = require('../models/cart');

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
    Cart.findOne({ UserId })
      .then(cart => {
        let pass = true
        cart.product.forEach((el, i) => {
          if(el.id == id) {
            pass = false;
            let newCount = Number(el.count) + Number(count)
            el.count = newCount;
          }
        })
        if(!pass) {
          return Cart.findOneAndUpdate({ UserId }, { product: cart.product }, {new: true})
        } else {
          return Cart.findOneAndUpdate({ UserId }, { $push: { product: payload, count }}, { new: true })
        }
      })
      .then(cart => {
        res.status(201).json({msg: 'success add to cart', cart})
      })
      .catch(next)
  },






  checkout (req,res,next) {
    const product = []
    Cart.findOneAndUpdate({ UserId: req.loggedUser.id }, { product }, {new: true})
      .then((cart) => {
        res.status(200).json({ cart })
      })
      .catch(next)
  }
}