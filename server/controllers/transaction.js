const Transaction = require('../models/transaction')
const Product = require('../models/product')

class TransactionController {
    static getTransaction(req, res, next) {
        Transaction.find({
            user: req.decoded.id,
            checkout: false
        })
            .populate('user')
            .populate('product')
            .then(transaction => {
                console.log(transaction)
                res.status(200).json({
                    transaction
                })
            })
            .catch(next)
    }

    static checkoutTransaction(req, res, next) {
        Transaction.find({
            user: req.decoded.id,
            checkout: false
        })
            .then(transactions => {
                for (let i = 0; i < transactions.length; i++) {
                    Product.findById(transactions[i].product)
                        .then(product => {
                            let currentstock = product.stock - transactions[i].quantity
                            if (currentstock < 0) {
                                throw 'EMPTY PRODUCT'
                            }
                            Product.update({
                                _id: product.id
                            }, {
                                stock: currentstock
                            })
                                .then(product => {
                                    Transaction.update({
                                        _id: transactions[i].id
                                    }, {
                                        checkout: true
                                    })
                                        .then(checkout => {
                                            if (i === transactions.length - 1) {
                                                res.status(200).json({
                                                    message: 'Checkout success'
                                                })
                                            }
                                        })
                                })
                        })
                }
            })
            .catch(next)
    }

    static createTransaction(req, res, next) {
        Transaction.findOne({ product: req.body.productId })
            .then(transaction => {
                if (transaction) {
                    let newqty = Number(transaction.quantity) + Number(req.body.quantity)
                    return Transaction.findByIdAndUpdate(transaction._id, { quantity: newqty })
                } else {
                    return Product.findById(req.body.productId)
                        .then(product => {
                            if (product.stock >= req.body.quantity) {
                                let subTotal = Number(product.price) * Number(req.body.quantity)
                                return Transaction.create({
                                    user: req.decoded.id,
                                    product: req.body.productId,
                                    quantity: req.body.quantity,
                                    subTotal
                                })
                            } else {
                                throw 'Not enough product stock'
                            }
                        })
                }
            })
            .then(transaction => {
                res.status(201).json({
                    message: 'Transaction created',
                    transaction
                })
            })
            .catch(next)
    }

    static deleteTransaction(req, res, next) {
        Transaction.findByIdAndRemove(req.params.id)
            .then(transaction => {
                res.status(200).json({
                    message: 'Delete success'
                })
            })
            .catch(next)
    }
}

module.exports = TransactionController