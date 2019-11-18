const Transanction = require('../models/Transaction')
const Product = require('../models/Product')
const Cart = require('../models/Cart')
const { ObjectId } = require('mongoose').Types.ObjectId


class TransanctionController{

    static create(req, res, next){
        const userId= req.decode.id
        const productIds = []
        const transactionItems = []
        const { totalPrice } = req.body
        // cari cart dengan user id yang sesuai
        Cart.findOne({ userId })
            .then(cart =>{
                cart.items.forEach(item => {
                    productIds.push(ObjectId(item.productId))
                    transactionItems.push({
                        productId : item.productId,
                        seller: item.seller,
                        qty : item.qty
                    })
                });

                return Product.find({
                    "_id" : { $in: productIds }
                })
            })
            .then(products =>{
                // check apakah stock masih cukup
                let listOfOutStock = []
                products.forEach(product => {
                    transactionItems.forEach(transc =>{
                        if(product._id + '' == transc.productId + ''){
                            if(product.stock < transc.qty){
                                listOfOutStock.push(product.name)
                            }
                        }
                    })
                });

                // jika stock tidak cukup maka kirim error
                if(listOfOutStock.length){
                    next({
                        status: 400,
                        msg: `product ${listOfOutStock} is out of stock, please delete the product/products from your cart if you want to continue`
                    })
                } 
                // jika stock cukup
                else {
                    // mengurangi stock produk || Promise All
                    let promises = []
                    transactionItems.forEach(item => {
                        let id = item.productId
                        let decrement  = item.qty * -1
                        promises.push(Product.findByIdAndUpdate(id, { $inc: { stock: decrement } }))
                    });
                    return Promise.all(promises)
                }
            })
            .then((response)=>{
                // menghapus cart
                return Cart.findOneAndDelete({ userId })
            })
            .then((response)=>{
                // membuat trasaction baru
                return Transanction.create({ items: transactionItems, userId, totalPrice })
            })
            .then(transc =>{
                res.status(201).json(transc)
            })
            .catch(next)
            
        }

        static find(req,res,next){
            const userId = req.decode.id
            Transanction.find({ userId }).populate('items.productId').populate('items.seller').populate('userId')
                .then(transc =>{
                    res.status(200).json(transc)
                })
                .catch(next)
        }

        static getBySeller(req, res, next){
            const userId = req.decode.id
            Transanction.find({'items.seller': userId }).populate('items.productId').populate('items.seller').populate('userId')
            .then(transc => {
                res.status(200).json(transc)
            })
            .catch(next)
        
        }

        static changeStatus(req, res, next){
            const  productId = req.params.id
            const { status } = req.body
            Transanction.findOneAndUpdate(
            { 
                'items.productId': productId 
            },
            {
                $set: {
                   'items.$.status' : status
                },
            }, 
            { 
                new: true
            })
            .then(transc =>{
                res.status(200).json(transc)
            })
            .catch(next)
        }

}

module.exports = TransanctionController
