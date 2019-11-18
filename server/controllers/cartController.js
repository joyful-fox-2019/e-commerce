const Cart = require('../models/cart')
const Product = require('../models/product')


class CartController {

    static readAll (req,res,next) {
        let userId = req.decoded.id
        Cart.find({userId: userId}).populate('productId')
            .then(function (carts) {
                res.status(200).json(carts)
            })
            .catch(next)
    };

    static create (req,res,next) {
        let userId = req.decoded.id
        let productId = req.params.productId
        let amounts = Number(req.body.amounts)
        let totalPrice = Number(req.body.totalPrice)
        let productsLeft;
        Product.findOne({
            _id: productId
        })
        .then(function (product) {
            if (product) {
                productsLeft = product.stocks
                if (amounts > product.stocks) {
                    next({status: 400, message: `This product stock just ${product.stocks} left`})
                }else {
                    return Cart.findOne({id: productId.id, userId: userId})
                        .then(function (cart) {
                            if (cart) {
                                let minMaxStock = amounts + cart.amounts  
                                if (productsLeft < minMaxStock) {
                                    res.status(400).json({message: `Product just have ${productsLeft} left`})
                                }else {
                                    let totalPriceUpdate = cart.totalPrice + totalPrice
                                    let amountsUpdate = cart.amounts + amounts
                                    return Cart.findOneAndUpdate({_id: cart.id},{$set: {totalPrice: totalPriceUpdate, amounts: amountsUpdate}})
                                        .then(function (cart) {
                                            res.status(202).json({message: `Your product in cart already Updated`})
                                        })
                                }
                            }else {
                                return Cart.create({
                                    productId: productId,
                                    userId: userId,
                                    amounts: amounts,
                                    totalPrice: totalPrice
                                })
                                .then(function (cart) {
                                    res.status(201).json({message: `Product already added to your cart`})
                                })
                            }
                        })
                }
            }else {
                next({status: 404, message: `Product not found`})
            }
        })
        .catch(next)
    }

    static deleteCart (req,res,next) {
        let cartId = req.params.cartId
        Cart.findOneAndDelete({_id: cartId})
            .then(function (cart) {
                res.status(202).json({message: `Cart Already Deleted`})
            })
            .catch(next)
    };



}////

module.exports = CartController;