const cartModel = require('../models/cart')

module.exports = {
    create(req,res,next){
        const userId = req.loggedUser.id
        const { productId, quantities } = req.body
        const cartForm = { productId, quantities, userId }
        cartModel.create(cartForm)
            .then(cart=>{
                res.status(201).json(cart)
            })
            .catch(next)
    },
    deleted(req,res,next){
        const { id } = req.body
        cartModel.findByIdAndDelete({ _id : id })
            .then(cart=>{
                res.status(200).json(cart)
            })
            .catch(next)
    },
    findMyCart(req,res,next){
        cartModel.find({ userId : req.loggedUser.id })
            .populate('productId')
            // .populate('userId')
            .then(carts=>{
                res.status(200).json(carts)
            })
            .catch(next)
    },
    findAll(req,res,next){
        cartModel.find()
            .populate('Product')
            .populate('User')
            .then(carts=>{
                res.status(200).json(carts)
            })
            .catch(next)
    },
    updateQuantities(req,res,next){
        const { quantities } = req.body
        cartModel.findOneAndUpdate({ _id : req.params.id }, { quantities } ,{ new : true })
            .then(cart=>{
                res.status(200).json(cart)
            })
            .catch(next)
    }
}