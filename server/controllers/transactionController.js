const Transaction = require('../models/transaction')
const User = require('../models/user')
const Cart = require('../models/cart')
const Product = require('../models/product')

class transactionController {
    static getAll(req, res, next) {
        Transaction.find() 
            .then(transactions => {
                res.status(200).json(transactions)
            })
            .catch(next)
    }

    static checkOut(req, res, next) { //Still need to decrease the stock bsaed on product's quantity
        createdTransaction = {
            user: req.LoggedUser.id,
            cart: req.params.id
        }

        Transaction.create(createdTransaction)
            .then(transaction_data => {
                return User.findByIdAndUpdate(req.LoggedUser.id, {
                    cart: [],
                    $push: {
                        transaction: transaction_data._id
                    }
                })
            })
            .then(user => {
                return Cart.findByIdAndDelete(req.params.id)
            })
            .then(cart => {
                
            })
            .catch(next)
    }
}

module.exports = transactionController