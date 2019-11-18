const Transaction = require("../models/transaction");

class TransactionController {
  static all(req, res, next) {
    Transaction.find({
      UserId: req.payload.id
    })
      .populate({
        path: 'productsList',
        populate: {
          path: 'product',
          model: 'Product'
        }
      })
      .then(results => {
        res.status(200).json(results);
      })
      .catch(next)
  }

  static create(req, res, next) {
    let { productsList, totalCost, status } = req.body
    Transaction.create({
      UserId: req.payload.id,
      productsList,
      totalCost,
      status
    })
      .then(result => {
        res.status(201).json(result)
      })
      .catch(next)
  }

  static update(req, res, next) {
    let { status } = req.body
    Transaction.findOneAndUpdate({
      _id: req.params.id
    }, {
      status
    })
      .then(result => {
        res.status(200).json(result);
      })
      .catch(next)
  }

  static adminAll(req, res, next) {
    Transaction.find({})
      .populate({
        path: 'productsList',
        populate: {
          path: 'product',
          model: 'Product'
        }
      })
      .populate('UserId')
      .then(results => {
        for (let i = 0; i < results.length; i++) {

        }
        res.status(200).json(results);
      })
      .catch(next)
  }

  static adminUpdate(req, res, next) {
    let { status } = req.body
    Transaction.findOneAndUpdate({
      _id: req.params.id
    }, {
      status
    })
      .then(result => {
        res.status(200).json(result);
      })
      .catch(next)
  }

}

module.exports = TransactionController
