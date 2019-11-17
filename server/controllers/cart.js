const Cart = require('../models/cart')
// console.log('kehalaman cart')

class CartController {
  static find(req, res, next) {
    // Cart.findOneAndUpdate({})
    console.log('kesini cart')
    console.log(req.loggedUser, "loggedUser")
    Cart.find({ user: req.loggedUser._id}).sort({ createdAt : 'desc'})
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
    console.log(req.loggedUser, "loggedUser")
    const { product, amount } = req.body
    const user = req.loggedUser._id
    Cart.create({ user, product, amount })
      .then(cart => {
        res.status(201).json(cart)
      }) 
      .catch(next)
  }
  static update(req, res, next) {
    let id = req.params.id
    const { amount } = req.body
    Cart.findByIdAndUpdate(id, { amount }, { omitUndefined: true, new: true, runValidators: true, useFindAndModify: false })
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