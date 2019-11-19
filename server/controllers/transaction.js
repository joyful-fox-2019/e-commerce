const Transaction = require('../models/transaction')
const Product = require('../models/product')

class TransactionController {
  static create (req, res,next) {
    const { items, price } = req.body
    let productIds = []
    items.forEach(item => {
      productIds.push({id: item.product, qty: item.qty })
    })
    const { id } = req.loggedUser
    let result
    Transaction.create({ items, price, owner: id })
      .then(transaction => {
        result = transaction
        let promises = []
        productIds.forEach(product => {
          promises.push(Product.findById(product.id))
        })
        return Promise.all(promises)
      })
      .then(products => {
        let promises = []
        products.forEach((product, index) => {
          product.stock -= productIds[index].qty
          product.sold += productIds[index].qty
          promises.push(product.save({ validateBeforeSave: false }))
        })
        return Promise.all(promises)
      })
      .then(products => {
        // res.status(201).json({ transaction: result, message: 'Successfully create transaction'})
        next()
      })
      .catch(next)
  }
  static find (req, res, next) {
    let objParams = {}
    if(req.loggedUser.role === 'user') objParams.owner = req.loggedUser.id
    Transaction.find(objParams)
      .populate('owner')
      .populate('items.product')
      .sort([['createdAt', 'desc']])
      .then(transactions => {
        res.status(200).json(transactions)
      })
      .catch(next)
  }
  static findById (req, res, next) {
    const { id } = req.params
    Transaction.findById(id)
      .then(transaction => {
        res.status(200).json(transaction)
      })
      .catch(next)
  }
  static update (req, res, next) {
    const { status } = req.body
    const { id } = req.params
    Transaction.findByIdAndUpdate(id, { status })
      .then(transaction => {
        res.status(200).json({ transaction, message: 'Successfully updated transaction'})
      })
      .catch(next)
  }
  
}

module.exports = TransactionController