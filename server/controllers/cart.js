const Cart = require('../models/Cart')

module.exports = {
  find: (req, res, next) => {
    Cart.find({ customer: req.loggedUser._id })
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
  }
}