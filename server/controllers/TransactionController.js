const Transaction = require('../models/Transaction')
const Cart = require('../models/Cart')
const Product = require('../models/Product')

class TransactionController {
    static checkout (req,res,next) {
        let userId = req.loggedUser._id
        let total = 0
        let productArray = []
        let updateProduct = []
        Cart.find({userId}).populate('productId')
            .then(data=>{
                if(data.length !=0) {
                    for (let i = 0; i < data.length; i++) {
                        total += (data[i].productId.price * data[i].qty)
                        let product = {
                            productId: data[i].productId._id,
                            name: data[i].productId.name,
                            price: data[i].productId.price,
                            image: data[i].productId.image,
                            quantity: data[i].qty
                        }
                        productArray.push(product)
                        // cek stock masih ada atau tidak
                        if(data[i].productId.stock - data[i].qty < 0) {
                            next({status: 400,msg:`${data[i].productId.name} is out of stock`})
                        } else {
                            let bulkUpdate = {
                                updateOne : {
                                    filter : { _id: data[i].productId._id },
                                    update : { stock: data[i].productId.stock - data[i].qty }
                                }
                            }
                            updateProduct.push(bulkUpdate)
                        }
                    }
                    return Product.bulkWrite(updateProduct)
                } else {
                    next({status: 404,msg:'cart is not found'})
                }
            })
            .then(_=>{
                return Transaction.create({
                    userId,
                    totalPrice:total,
                    products: productArray
                })
            })
            .then(_=>{
                return Cart.deleteMany(({userId}))
            })
            .then(_=>{
                res.status(201).json({message:'transaction success'})
            })
            .catch(next)
    }
    static history (req,res,next) {
        Transaction.find()
            .populate('userId')
            .then(data=>{
                res.json(data)
            })
            .catch(next)
    }
    // for cutomer
    static delivered (req,res,next) {
        // let userId = req.loggedUser._id
        let { id } = req.params
        Transaction.findOneAndUpdate({_id:id},{$set: {deliverStatus: true}}, {new: true})
            .then(data=>{
                res.json(data)
            })
            .catch(next)
    }
    static getTransaction (req,res,next) {
        let userId = req.loggedUser._id
        Transaction.find({userId})
        .then(data=>{
            res.json(data)
        })
        .catch(next)
    }
}

module.exports = TransactionController