const Cart = require('../models/Cart')

module.exports = {
  find: (req, res, next) => {
    Cart.find({ customer: req.loggedUser._id }).populate('product')
      .then(carts => {
        res.status(200).json(carts)
      })
      .catch(next)
  },
  create: (req, res, next) => {
    const { product, qty } = req.body
    Cart.create({ product, qty, customer: req.loggedUser._id })
      .then(cart => {
        res.status(201).json(cart)
      })
      .catch(next)
  },
  update: (req, res, next) => {
    const { qty } = req.body
    Cart.findByIdAndUpdate(req.params.id,
    { qty }, {
      omitUndefined: true, new: true, runValidators: true
    })
      .then(cart => {
        res.status(200).json(cart)
      })
      .catch(next)
  },
  delete: (req, res, next) => {
    Cart.findByIdAndDelete(req.params.id)
      .then(cart => {
        res.status(200).json(cart)
      })
      .catch(next)
  }
}