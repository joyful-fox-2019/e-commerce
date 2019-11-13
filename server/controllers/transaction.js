const Transaction = require('../models/transaction')

class TransactionController {
  static find(req, res, next) {
    Transaction.find()
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
    const { userId, carts, total } = req.body
    Transaction.create({ userId, carts, total })
      .then(transaction => {
        res.status(201).json(transaction)
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