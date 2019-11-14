const { cart } = require('../models')

class CartController {
  static add(req, res, next) {
    const { ProductId, qty } = req.body
    cart
      .create({
        UserId: req.loggedUser._id,
        ProductId,
        qty
      })
      .then(result => {
        res.status(201).json(result)
      })
      .catch(next)
  }
  static delete(req, res, next) {
    cart
      .findByIdAndDelete(req.params.id)
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }
}

module.exports = CartController
