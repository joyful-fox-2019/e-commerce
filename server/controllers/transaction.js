const Transaction = require('../models/transaction')
const Cart = require('../models/cart')
const Product = require('../models/product')

class TransactionController {
  static find(req, res, next) {
    let query = {}
    if (req.loggedUser.role !== 'admin') {
      query.userId = req.loggedUser._id
    }
    console.log(query, "querrrrrrrrrrrrrrrr");
    
      Transaction.find(query)
        .then(transaction => {
          res.status(200).json(transaction)
        })
        .catch(next)

  }
  static findOne(req, res, next) {
    let id = req.params.id
    Transaction.findById(id)
      .then(transaction => {
        res.status(200).json(transaction)
      })
      .catch(next)
  }
  static create(req, res, next) {
    const { carts, total } = req.body
    const userId = req.loggedUser._id
    console.log(carts, "dari transaction mau create ");
    
    let trx = {}

    
    Transaction.create({ userId, carts, total })
      .then(transaction => {
        trx = transaction
        return Cart.deleteMany({user : req.loggedUser._id})
      })
      .then(n => {
        let promises = []
        carts.forEach(cart => {
          let productId = cart.product._id
          let stock =  cart.product.stock
          let amount = cart.amount
          promises.push(Product.findByIdAndUpdate(productId, { stock : stock - amount }))
         
        })
        return Promise.all(promises)
      })
      .then(arr => {
        res.status(201).json(trx)
      })
      .catch(next)
  }
  static update(req, res, next) {
    let id = req.params.id
    const { userId, carts, total } = req.body
    Transaction.findByIdAndUpdate(id, { userId, carts, total }, { omitUndefined: true, new: true, runValidators: true, useFindAndModify: false } )
      .then(transaction => {
        res.status(200).json(transaction)
      })
      .catch(next)
  }
  static delete(req, res, next) {
    let id = req.params.id
    Transaction.findByIdAndDelete(id)
      .then(transaction => {
        res.status(200).json(transaction)
      })
      .catch(next)
  }
}

module.exports = TransactionController