const Cart = require('../models/cart')

class CartController {
  static find(req, res, next) {
    Cart.find()
    .populate('user')//field mana yg akan di populate
    .populate('product')
      .then(cart => {
        res.status(200).json(cart)
      })
      .catch(next)
  }
  static findOne(req, res, next) {
    let id = req.params.id
    Cart.findById(id)
      .then(cart => {
        res.status(200).json(cart)
      })
      .catch(next)
  }
  static create(req, res, next) {
    const { user, product, amount } = req.body
    Cart.create({ user, product, amount })
      .then(cart => {
        res.status(201).json(cart)
      }) 
      .catch(next)
  }
  static update(req, res, next) {
    let id = req.params.id
    const { user, product, amount } = req.body
    Cart.findByIdAndUpdate(id, { user, product, amount }, { omitUndefined: true, new: true, runValidators: true, useFindAndModify: false })
      .then(cart => {
        res.status(200).json(cart)
      })
      .catch(next)
  }
  static delete(req, res, next) {
    let id = req.params.id
    Cart.findByIdAndDelete(id)
      .then(cart => {
        res.status(200).json(cart)
      })
      .catch(next)
  }

}

module.exports = CartController