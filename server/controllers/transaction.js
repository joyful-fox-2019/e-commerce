const Transaction = require('../models/Transaction')
const { Schema } = require('mongoose')

module.exports = {
  find: (req, res, next) => {
    let filter = {}
    if(!req.loggedUser.isAdmin) {
      filter.customer = req.loggedUser._id
    }
    Transaction.find(filter).populate('customer')
      .then(transactions => {
        res.status(200).json(transactions)
      })
      .catch(next)
  },
  findOne: (req, res, next) => {
    let filter = {}
    if(!req.loggedUser.isAdmin) {
      filter.customer = req.loggedUser._id
    }
    filter._id = req.params.id
    Transaction.findOne(filter).populate('customer')
      .then(transaction => {
        res.status(200).json(transaction)
      })
      .catch(next)
  },
  create: (req, res, next) => {
    const { carts, total } = req.body
    Transaction.create({ customer: req.loggedUser._id, carts, total })
      .then(transaction => {
        req.carts = carts
        req.transaction = transaction
        next()
      })
      .catch(next)
  },
  update: (req, res, next) => {
    Transaction.findById(req.params.id)
      .then(transaction => {
        if(!transaction) {
          throw { status: 404, msg: 'Data not found'}
        } else {
          if(transaction.status === 'Waiting for confirmation' && req.loggedUser.isAdmin) {
            transaction.status = 'Order shipped'
          } else if(transaction.status === 'Order shipped' && !req.loggedUser.isAdmin) {
            transaction.status = 'Order received'
          } else {
            throw { status: 403, msg: 'You are not authorized to update this data'}
          }
        }
        transaction.save()
        res.status(200).json(transaction)
      })
      .catch(next)
  }
}