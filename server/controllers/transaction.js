const Transaction = require('../models/Transaction')

module.exports = {
  find: (req, res, next) => {
    let filter = {}
    if(!req.loggedUser.isAdmin) {
      filter.customer = req.loggedUser._id
    }
    Transaction.find(filter)
      .then(transactions => {
        res.status(200).json(transactions)
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
    const { status } = req.body
    Transaction.findByIdAndUpdate(req.params.id, {
      status
    })
      .then(transaction => {
        res.status(200).json(transaction)
      })
      .catch(next)
  }
}