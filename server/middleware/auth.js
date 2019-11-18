const { verify } = require('../helpers/jwt')
const User = require('../models/User')
const Product = require('../models/Product')
const Cart = require('../models/Cart')
const Wishlist = require('../models/Wishlist')
const Transanction = require('../models/Transaction')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = {
    authentication(req, res, next) {
        try {
            req.decode = verify(req.headers.token)
            next()
        } catch (err) {
            next({
                status: 400,
                msg: 'please login first'
            })
        }
    },

    authorizationProduct(req, res, next){
        if(req.body.status === 'Done'){
            next()
        } else {
            const userId = req.decode.id
            const { id } = req.params
            Product.findById(id)
                .then(product =>{
                    if(product.userId + '' !== userId){
                        next({
                            status: 403,
                            msg: 'Unauthorized'
                        })
                    } else {
                        next()
                    }
                })
                .catch(next)
        }
    },

    authorizationAdmin(req, res, next) {
        const { id } = req.decode
        User.findById(id)
            .then(user =>{
                if(user.role !== 'admin'){
                    next({
                        status: 403,
                        msg: 'Only admin can do this actions'
                    })
                } else {
                    next()
                }
            })
    },
    

    authorizationCart(req, res, next){
        const { userId } = req.decode.id
        const { id } = req.params
        Cart.findById(id)
            .then(cart =>{
                if(cart.userId !== userId){
                    next({
                        status: 403,
                        msg: 'Unauthorized'
                    })
                } else {
                    next()
                }
            })
            .catch(next)

    },

    authorizationWishlist(req, res, next){
        const userId  = req.decode.id
        const productId = ObjectId(req.params.id)
        Wishlist.findOne({productId})
            .then(wishlist =>{
                if(!wishlist || wishlist.userId + '' !== userId){
                    next({
                        status: 403,
                        msg: 'Unauthorized'
                    })
                } else {
                    next()
                }
            })
            .catch(next)
    },

    authorizationTransaction(req, res, next){
        const userId  = req.decode.id
        const { id } = req.params
        Transanction.findById(id)
            .then(transanction =>{
                if(transanction.userId + '' !== userId){
                    next({
                        status: 403,
                        msg: 'Unauthorized'
                    })
                } else {
                    next()
                }
            })
            .catch(next)
    }
}