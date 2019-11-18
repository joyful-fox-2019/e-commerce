const Transaction = require('../models/transaction')
const mongoose = require('mongoose')

class transactionController {
    static create(req, res, next) {
        let carts = req.body
        console.log('masuk create transaction')
        Transaction.
            create({carts, 
                    user : req.user._id
                })
            .then(data => {
                res.status(201).json({
                    data : data,
                    msg : `transaction succesfully created`
                })
            })  
            .catch(next)  
    }

    static findAll(req, res, next) {
        console.log('masuk find all transaction', typeof req.user._id)
        Transaction.
            find({user : req.user._id})
            .then((data) => {
                console.log(data)
                if (data) {
                    res.json(data)
                } else {
                    next({
                        status : 404,
                        msg : 'data not found'
                    })
                }
            })
            .catch(next)
    }

    static update(req, res, next) {
        console.log('masuk update')
        let {carts, status} = req.body
        console.log(req.params.id)
        Transaction.
            findOneAndUpdate({
                _id : req.params.id
            }, {
                carts,
                status,
                user : req.user._id,               
            },{
                new : true
            }).
            then(transaction => {
                if (transaction) {
                    res.json(transaction)
                } else {
                    next({
                        status : 404,
                        msg : 'transaction not found'
                    })
                }
                
            })
            .catch(next)
    }
        
}

module.exports = transactionController