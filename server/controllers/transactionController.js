const Transaction = require('../models/transaction')
const  Product = require('../models/product')
const User = require('../models/user')
const Cart = require('../models/cart')

class TransactionController {

    static readMe (req,res,next) {
        let userId = req.decoded.id 
        Transaction.find({_id: userId})
            .then(function (transactions) {
                res.status(200).json(transactions)
            })
            .catch(next)
    };

    // static create (req,res,next) {
    //     let totalPrice = req.body.totalPrice
    //     let productId = req.params.productId
    //     let userId = req.decoded.id
    //     User.find({_id: userId})
    //         .then(function (user) {
    //             if (user) {
    //                 if (totalPrice =< user.balanced) {
    //                     next({status: 400, message: 'You must topUp first'})
    //                 }else {
    //                     Cart.find({
    //                         userId: userId,
    //                         productId: productId,
    //                         status: false
    //                     })
    //                     .then(function (carts) {
                            
    //                     })
    //                 }
    //             }else{
    //                 next({status: 403, message: 'Forbidden'})
    //             }
    //         })
    // };

    // static async create (req,res,next) {
    //     let totalPrice = req.body.totalPrice
    //     let productId = req.params.productId
    //     let userId = req.decoded.id
    //     let finalPrice = 0;
    //     let cartsId = []
    //     const findUser = await User.findOne({_id: userId})
    //     if (findUser) {
    //         if (findUser.balanced <= totalPrice) {
    //             next({status: 400, message: 'You must top up your balance'})
    //         }else {
    //             const findCart = await Cart.find({
    //                 userId: userId,
    //                 productId: productId,
    //                 status: false
    //             })
    //             await findCart.forEach(function (cart) {
    //                 cartsId.push(cart.id)
    //                 finalPrice += findCart.totalPrice 
    //             })
    //             const newTransaction = await Transaction.create({
    //                 carts: cartsId,
    //                 totalPrice: finalPrice
    //             })
    //             const transactionId = newTransaction.id
    //         }
    //     }else {
    //         next({status: 403, message: 'Forbidden'})
    //     }
    // };

    static async create(req,res,next) {
  
        let totalPrice = req.body.totalPrice
        let carts = req.body.carts
        let userId = req.decoded.id
        
        const cartOwner = await User.findOne({_id: userId})
    
        if (cartOwner.balanced < totalPrice) {
            next({status: 400, message: 'You must topUp your balance first'})
        }else {

            let defStock = false
            let errProductStock = []
            
            carts.forEach(function (cart) {
                
                if (cart.productId.stocks < cart.amounts) {
                    console.log('Kurang stocknya')
                    defStock = true
                    errProductStock.push(cart.productId)
                }
            })
            let sendErrorMessage = ''
            console.log(errProductStock)
            for (let i = 0; i < errProductStock.length; i++) {

                sendErrorMessage += errProductStock[i].productName + ', '
            }
            
            if (defStock == true) {
                res.status(400).json({message: `${sendErrorMessage} stock is out of your amounts` })
            }else {
                const newTransaction = await Transaction.create({
                    carts: carts,
                    userId: userId,
                    totalPrice: totalPrice
                })
                .then(function (transaction) {
                    res.status(201).json({message: 'Your, process Transaction is accepted'})
                })


                console.log('Jadi buat Transaction')

            }
        }
    }

}


module.exports = TransactionController
