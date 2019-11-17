const { Cart, User, Item } = require('../models')

class CartController {

    static create(req, res, next) {
        const itemId = req.params.id
        const qty = Number(req.body.qty)
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
            .populate('itemId')
            .then(carts => {
                console.log(carts)
                res.status(200).json({carts})
            }).catch(next)
    }

    static showAllUserCart(req, res, next) {
        Cart.find({userId: req.loggedUser.id})
            .populate('itemId')
            .then(carts => {
                res.status(200).json({carts})
            }).catch(next)
    }

    static showAllHistoryUserCart(req, res, next) {
        Cart.find({userId: req.loggedUser.id, status: true})
            .populate('itemId')
            .then(carts => {
                res.status(200).json({carts})
            }).catch(next)
    }

    static showAllPendingUserCart(req, res, next) {
        Cart.find({userId: req.loggedUser.id, status: false})
            .populate('itemId')
            .then(carts => {
                res.status(200).json({carts})
            }).catch(next)
    }

    static update(req, res, next) {
        const { id } = req.params
        const update = {}
        let qtyCheckout
        for (let key in req.body) {
            update[key] = req.body[key]
        }
        if (update.status) { //untuk update status
            Cart.findByIdAndUpdate(id, update)
                .then(cart => {
                    if (!cart) throw ({message: 'data not found'})
                    qtyCheckout = cart.qty
                    return Item.findById(cart.itemId)
                })
                .then(item => {
                    let newQty = item.stock - qtyCheckout 
                    return Item.findByIdAndUpdate(item._id, { stock: newQty})
                })
                .then(_ => {
                    res.status(200).json({message: 'checkout success'})
                }).catch(next)     
        } else if (update.qty) { //untuk update qty
            Cart.findById(id)
                .then(cart => {
                    if (!cart) throw ({message: 'data not found'})
                    return Item.findById(cart.itemId)
                })
                .then(item => {
                    if (item.stock < update.qty) throw ({message: 'stock less than qty'})
                    const subPrice = item.price * update.qty
                    update.subPrice = subPrice
                    return Cart.findByIdAndUpdate(id, update)
                })
                .then(cart => {
                    res.status(200).json({message: 'success update cart'})
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