const { Cart, User, Item } = require('../models')

class CartController {

    static create(req, res, next) {
        const itemId = req.params.id
        const qty = req.body.qty
        let subPrice
        //qty validation
        Item.findById(itemId)
            .then(item => {
                if (!item) throw ({message: 'data not found'})
                if (item.stock < qty) throw ({message: 'stock less than qty'})
                subPrice = item.price * qty
                return Cart.create({
                   userId: req.loggedUser.id,
                   itemId,
                   qty,
                   subPrice 
                })
            })
            .then(newCart => {
                res.status(201).json({newCart, message: 'succes add product to cart'})
            }).catch(next)
    }

    static showAll(req, res, next) { //admin only
        Cart.find()
            .then(carts => {
                res.status(200).json({carts})
            }).catch(next)
    }

    static showAllUserCart(req, res, next) {
        Cart.find({userId: req.loggedUser.id})
            .then(carts => {
                res.status(200).json({carts})
            }).catch(next)
    }

    static showAllHistoryUserCart(req, res, next) {
        Cart.find({userId: req.loggedUser.id, status: true})
            .then(carts => {
                res.status(200).json({carts})
            }).catch(next)
    }

    static showAllPendingUserCart(req, res, next) {
        Cart.find({userId: req.loggedUser.id, status: false})
            .then(carts => {
                res.status(200).json({carts})
            }).catch(next)
    }

    static update(req, res, next) {
        console.log('masuk update')
        const { id } = req.params
        const update = {}
        for (let key in req.body) {
            update[key] = req.body[key]
        }
        if (!update.qty) {
            Cart.findByIdAndUpdate(id, update)
                .then(cart => {
                    if (!cart) throw ({message: 'data not found'})
                    res.status(200).json({cart, message: 'success update cart'})
                }).catch(next)     
        } else {
            Cart.findById(id)
                .then(cart => {
                    if (!cart) throw ({message: 'data not found'})
                    return Item.findById(cart.itemId)
                })
                .then(item => {
                    if (item.stock < update.qty) throw ({message: 'stock less than qty'})
                    return Cart.findByIdAndUpdate(id, update)
                })
                .then(cart => {
                    res.status(200).json({cart, message: 'success update cart'})
                }).catch(next) 
        }
    }

    static delete(req, res, next) {
        const { id } = req.params
        Cart.findByIdAndDelete(id)
            .then(cart => {
                if (!cart) throw ({message: 'data not found'})
                res.status(200).json({cart, message: 'success delete cart'})
            }).catch(next)
    }
}

module.exports = CartController