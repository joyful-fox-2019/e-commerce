const Cart = require('../models/cart')

class CartController {
  static all(req, res, next) {
    Cart.find({ UserId: req.payload.id, isCheckedOut: false })
      .populate("product")
      .then(results => {
        res.status(200).json(results);
      })
      .catch(next)
  }
  static create(req, res, next) {
    let { product, quantity } = req.body
    Cart.findOne({ UserId: req.payload.id, product: product, isCheckedOut: false })
      .then(result => {
        if (result) {
          let err = new Error("Product is already in your cart, please edit the quantity in the cart menu")
          err.status = 400
          next(err)
        } else {
          return Cart.create({
            UserId: req.payload.id,
            product,
            quantity
          })
          .then(result => {
            res.status(201).json(result);
          })
          .catch(next)
        }
      })
      .catch(next)
  }
  static delete(req, res, next) {
    Cart.findOneAndDelete({
      _id: req.params.id
    })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }
  static update(req, res, next) {
    let { product, quantity, isCheckedOut } = req.body
    Cart.findOneAndUpdate({
      _id: req.params.id
    }, {
      UserId: req.payload.id,
      product,
      quantity,
      isCheckedOut
    }, {
      new: true
    })
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        next(err)
      })
  }
}
module.exports = CartController