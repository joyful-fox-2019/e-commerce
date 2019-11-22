const Cart = require('../models/cart')

class CartController {
    static createCart(req, res, next) {
        Cart.create({
                productId: req.body.productId,
                productName: req.body.productName,
                quantity: req.body.quantity,
                price: req.body.price,
                imageUrl: req.body.imageUrl
            })
            .then(cart => {
                res.status(200).json(cart)
            })
            .catch(err => {
                next(err)
            })
    }

    static deleteWholeCart(req, res, next) {
        Cart.deleteMany()
            .then(success => {
                res.status(200).json({
                    message: "Delete all product in cart success"
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static getAllCart(req,res,next){
        Cart.find()
            .then(cart => {
                res.status(200).json(cart)
            })
            .catch(err => {
                next(err)
            })
    }

    static deleteCart(req,res,next){
        Cart.deleteOne({
            _id: req.params.id
        })
        .then(response => {
            res.status(200).json({
                message: 'Delete product from cart success!'
            })
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = CartController