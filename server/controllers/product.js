const Product = require('../models/product')
const Cart = require('../models/cart')

class ProductController{
    static allProduct(req,res,next){
        Product.find()
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(next)
    }
    static searchProduct(req,res,next){
        let filter = req.query.filter
        let filterRegex = new RegExp(filter, 'gi')
        Product.find({name : {$regex : filterRegex}})
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(next)
    }
    static selectedProduct(req,res,next){
        const productId = req.params.id
        Product.findOne({_id : productId})
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(next)
    }

    static pageProduct(req,res,next){
        let perPage = 9
        let page = req.params.page -1
        Product.find()
        .sort({_id : 'desc'})
        .limit(perPage)
        .skip(perPage * page)
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(next)
    }

    // static addProduct(req,res,next){
    //     let productId = req.params.id 
    //     Cart.findOneAndUpdate({UserId : req.loggedUser.id}, {$push : {ProductsId : productId}}, {new : true})
    //     .then(data=>{
    //         if(data){
    //             res.status(200).json({msg : 'success add to cart', data})
    //         }else{
    //             next({
    //                 status : 400,
    //                 message : 'cart have not been made'
    //             })
    //         }
    //     })
    //     .catch(next)
    // }
    // static removeProduct(req,res,next){
    //     let productId = req.params.id 
    //     Cart.findOneAndUpdate({UserId : req.loggedUser.id}, {$pull : {ProductsId : productId}}, {new : true})
    //     .then(data=>{
    //         if(data){
    //             res.status(200).json({msg : 'success remove  cart', data})
    //         }else{
    //             next({
    //                 status : 400,
    //                 message : 'cart have not been made'
    //             })
    //         }
    //     })
    //     .catch(next)
    // }

    static addProduct(req,res,next){
        let productId = req.params.id 
        Cart.findOne({UserId : req.loggedUser.id, ProductId : productId})
        .then(data=>{
            if(data){
                let newAmount = data.amount + 1
                return Cart.findOneAndUpdate({UserId : req.loggedUser.id, ProductId : productId}, {$set : {amount : newAmount }}, {new : true})
            }else{
                return Cart.create({UserId : req.loggedUser.id, ProductId : productId})
            }
        })
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(next)
    }
    static removeProduct(req,res,next){
        let productId = req.params.id 
        Cart.findOne({UserId : req.loggedUser.id, ProductId : productId})
        .then(data=>{
            if(data && data.amount > 1){
                let newAmount = data.amount - 1
                return Cart.findOneAndUpdate({UserId : req.loggedUser.id, ProductId : productId}, {$set : {amount : newAmount }}, {new : true})
            }else if(data.amount <= 1){
                return Cart.findOneAndDelete({UserId : req.loggedUser.id, ProductId : productId})
            }
        })
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(next)
    }
    
}

module.exports = ProductController