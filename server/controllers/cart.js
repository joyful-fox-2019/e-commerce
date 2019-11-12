const Cart = require('../models/cart')

class CartController {
    static createCart(req, res, next) {
        Cart.create({
                listProduct: req.body.productId,
                quantity: req.body.quantity,
                price: req.body.price,
                UserId: req.body.userId
            })
            .then(cart => {
                res.status(200).json(cart)
            })
            .catch(err => {
                next(err)
            })
    }

    static getUserCart(req, res, next) {
        Cart.find()
            .then(carts => {
                res.status(200).json(carts)
            })
            .catch(err => {
                next(err)
            })
    }

    static deleteCart(req, res, next) {
        Cart.deleteOne({
                _id: req.params.id
            })
            .then(success => {
                res.status(200).json({
                    message: "Delete product success"
                })
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


}

module.exports = CartController