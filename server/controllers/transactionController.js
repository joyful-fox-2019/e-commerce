const Transaction = require ('../models/transactions')
const User = require('../models/user')
const Product = require('../models/product')

class TransactionController {
   static addToCart(req,res,next){
        Product.findOne({
            _id : req.params.id
        })
        .then(product => {
            if(product.stock > req.body.count){
                console.log(req.loggedUser._id)
                let cart = {
                    Product_id : product._id,
                    User_id : req.loggedUser.id,
                    count : req.body.count,
                    total_payment : req.body.count * product.price
                }
                Transaction.create(cart)
                .then(cart => {
                    res.status(201).json(cart)
                })
                .catch(next)
            }else{
                next({
                    status : 500,
                    message : 'stock is not enough'
                })
            }
        })
        .catch(next)
   }

   static checkOut(req,res,next){
       Transaction.find({
           User_id : req.loggedUser.id
       })
       .then(transactions => {
            transactions.forEach(transaction => {
                let updatedStock = null
                let totalBuy = transaction.count
                Product.findOne({_id : transaction.Product_id})
                .then(product => {
                    updatedStock = product.stock - totalBuy
                    Product.findOneAndUpdate({_id:product._id},{stock : updatedStock})
                    .then( product => {
                        console.log('update stock success')
                    })
                })
            });
                res.status(200).json('successfully checked out, thankyou!')
            })
        }

   static showTransaction(req,res,next){
    Transaction.find({
            User_id : req.loggedUser.id
        })
        // .populate('Product_id')
        .then(transaction => {
            res.status(200).json(transaction)
        })
        .catch(next)
    }
}

module.exports = TransactionController