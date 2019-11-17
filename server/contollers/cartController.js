const Cart = require('../models/cart')

class cartController {

    static findAll(req, res, next) {
        Cart.find({
            user : req.user_id
        })
        .then(carts => {
            if (carts) {
                res.json(carts)
            } else {
                next({
                    status : 404,
                    msg : 'we can not find the cart'
                })
            }
        })
        .catch(next)
    }

    static findOne(req, res, next) {
        Cart.findById(req.params.id)
            .then(cart => {
                if (cart) {
                    res.json(cart)
                } else {
                    next({
                        status : 404,
                        msg : 'we connot find the cart'
                    })
                }
            })
            .catch(next)
    }

    static create(req, res, next) {
        console.log('masuk create card')
        let array = []
        for (let i=0; i<req.body.length; i++) {
            let {product, totalPrice, totalItem } = req.body[i]
            array[i] = {
                user : req.user._id,
                isCheckout : true,
                product,
                totalPrice,
                totalItem 
            }
        }
        console.log(array)
        Cart.create(array)
            .then(cart => {
            res.status(201).json({
                msg : 'product has been add in your cart'
            })
        }).catch(next)
    }

    static update(req,res, next) {
        let {product, totalPrice, totalItem, isCheckout} = req.body
        Cart.findOneAndUpdate({
            _id : req.params.id
        }, {
            product,
            totalItem,
            totalPrice,
            user : req.user._id,
            isCheckout,
        })
        then(cart => {
            if (cart) {

            }
        })
    }

    static delete(req, res, next) {
        Cart.findOneAndDelete({
            user : req.params.id
        })
        .then(cart => {
            if (cart) {
                res.json({
                    masg : 'product has been remove from your cart'
                })
            } else {
                next({
                    msg : 'we cannot find the product'
                })
            }
        })
        .catch(next)
    }
}

module.exports = cartController