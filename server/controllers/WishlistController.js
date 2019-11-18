const Wishlist = require('../models/Wishlist')
const ObjectId = require('mongoose').Types.ObjectId

class WishlistController{

    static create(req, res, next){
        const userId = req.decode.id
        const productId = req.params.id
        Wishlist.create({ userId, productId })
            .then(wishlist =>{
                res.status(201).json(wishlist)
            })
            .catch(next)
    }

    static find(req, res, next){
        const userId = req.decode.id
        Wishlist.find({ userId }).populate('productId')
        .then(wishlist =>{
            let result = []
            wishlist.forEach(el => {
                result.push(el.productId)
            });
            res.status(200).json(result)
        })
        .catch(next)
    }

    static findByProductId(req,res, next){
        const userId = ObjectId(req.decode.id)
        const productId = ObjectId(req.params.id)
        Wishlist.findOne({ userId, productId })
            .then(wishlist =>{
                res.status(200).json(wishlist)
            })
            .catch(next)   
    }

    static delete(req,res, next){
        const productId = ObjectId(req.params.id)
        Wishlist.findOneAndDelete({ productId })
            .then(wishlist =>{
                res.status(200).json(wishlist)
            })
            .catch(next)   
    }

}

module.exports = WishlistController