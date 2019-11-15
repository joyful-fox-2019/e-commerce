const Transaction = require('../models/transaction')
const User = require('../models/user')
const Cart = require('../models/cart')
const Product = require('../models/product')

class TransactionController{
    static confirmTransaction(req ,res ,next){ 
        let outOfStock = [] 
        let listedItem = []
        let total = 0


        Cart.find({UserId : req.loggedUser.id}).populate('UserId').populate('ProductId')
        .then(data=>{
            data.forEach((element)=>{
                if(element.ProductId.stock < element.amount){
                    let cost = element.ProductId.price * element.amount
                    outOfStock.push({outOfStockProducts : element, amountIntended : element.amount, cost, stockAvailable : element.ProductId.stock})
                }else{
                    let cost = element.ProductId.price * element.amount
                    listedItem.push({products : element, amount : element.amount, cost, stockAvailable : element.ProductId.stock})
                    total += (element.amount * element.ProductId.price)
                }
            })
        })
        .then(_=>{
            return User.findOne({_id:req.loggedUser.id})
        })
        .then(data=>{
            res.status(200).json({listedItem, outOfStock, totalCost : total, balance : data.balance})
        })
        .catch(next)
    }
    
    // static createTransaction(req, res, next){
    //     let listedItem = []
    //     let updatedProducts = []
    //     let dataTransaction
    //     let total = 0
    //     Cart.find({UserId : req.loggedUser.id}).populate('UserId').populate('ProductId')
    //     .then(data=>{
    //         data.forEach((element)=>{
    //             if(element.ProductId.stock >= element.amount){
    //                 let cost = element.ProductId.price * element.amount
    //                 listedItem.push({name : element.ProductId.name, amount : element.amount, cost, seller: element.ProductId.seller})
    //                 total += cost
    //                 let bulkUpdate = {
    //                     updateOne : {
    //                         filter : {_id: element.ProductId._id},
    //                         update : {stock : element.ProductId.stock - element.amount}
    //                     }
    //                 }
    //                 updatedProducts.push(bulkUpdate)
    //                 return Product.bulkWrite(updatedProducts)
    //             }else{
    //                 throw({
    //                     status : 400,
    //                     message : 'transaction failed, not enough quantity stock for the items'
    //                 })
    //             }
    //         })
    //     })
    //     .then(_=>{
    //         if(listedItem.length > 0){
    //             let transaction = {
    //                 UserId : req.loggedUser.id,
    //                 Products : listedItem,
    //                 date : Date.now(),
    //                 status : false,
    //                 total : total
    //             }
    //             return Transaction.create(transaction)
    //         }else{
    //             throw({
    //                 status : 400,
    //                 message : 'transaction failed no items in your cart'
    //             })
    //         }
    //     })
    //     .then(data=>{
    //         dataTransaction = data
    //         return Cart.deleteMany({UserId : req.loggedUser.id}) 
    //     })
    //     .then(_=>{
    //         res.status(201).json({msg : 'success checkout', dataTransaction})
    //     })
    //     .catch(next)
    // }

    static createTransaction(req, res, next){
        let listedItem = []
        let updatedProducts = []
        let updatedSeller = []
        let dataTransaction
        let total = 0
        let balanceNow
        Cart.find({UserId : req.loggedUser.id}).populate('UserId').populate('ProductId')
        .then(data=>{
            data.forEach((element)=>{
                if(element.ProductId.stock >= element.amount){
                    let cost = element.ProductId.price * element.amount
                    listedItem.push({productId: element.ProductId._id, name : element.ProductId.name, amount : element.amount, cost, seller: element.ProductId.seller})
                    total += cost
                    let bulkUpdate = {
                        updateOne : {
                            filter : {_id: element.ProductId._id},
                            update : {
                                stock : element.ProductId.stock - element.amount,
                            }
                        }
                    }
                    let sellerUpdate = {
                        updateOne : {
                            filter : {username: element.ProductId.seller},
                            update : {
                                balance : element.amount*element.ProductId.price
                            }
                        }
                    }
                    updatedProducts.push(bulkUpdate)
                    updatedSeller.push(sellerUpdate)
                }else{
                    throw({
                        status : 400,
                        message : 'transaction failed, not enough quantity stock for the items'
                    })
                }
            })
            return User.findOne({_id:req.loggedUser.id})
        })
        .then(data=>{
            console.log(data)
            if(data.balance>=total){
                balanceNow = data.balance -total
                return User.findOneAndUpdate({_id:req.loggedUser.id}, {balance : balanceNow}, {new : true})
            }else{
                throw({
                    status : 400,
                    message : 'transaction failed, not enough balance'
                }) 
            }
        })
        .then(_=>{
            return Product.bulkWrite(updatedProducts)
        })
        .then(_=>{
            if(listedItem.length > 0){
                let transaction = {
                    UserId : req.loggedUser.id,
                    Products : listedItem,
                    date : Date.now(),
                    status : false,
                    total : total
                }
                return Transaction.create(transaction)
            }else{
                throw({
                    status : 400,
                    message : 'transaction failed no items in your cart'
                })
            }
        })
        .then(data=>{
            dataTransaction = data
            return Cart.deleteMany({UserId : req.loggedUser.id}) 
        })
        .then(_=>{
            return User.bulkWrite(updatedSeller)
        })
        .then(_=>{
            res.status(201).json({msg : 'success checkout', dataTransaction})
        })
        .catch(next)
    }

    static purchasedTransaction(req, res, next){
        Transaction.find({UserId : req.loggedUser.id})
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(next)
    }

    static soldTransaction(req, res, next){
        let soldItem = []
        Transaction.find({Products : {$elemMatch: {seller : req.loggedUser.username}}}).populate('UserId')
        .then(data=>{
            data.forEach(transaction=>{
                let product = {
                    TransactionId : transaction._id,
                    UserId : transaction.UserId,
                    status : transaction.status,
                    sold : []
                }
                transaction.Products.forEach(item=>{
                    if(item.seller === req.loggedUser.username){    
                        product.sold.push(item)
                    }
                })
                soldItem.push(product)
            })
            res.status(200).json(soldItem)
        })
        .catch(next)
    }
}

module.exports = TransactionController