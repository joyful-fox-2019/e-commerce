const Cart = require('../models/cart');

class CartController {
    static create(req, res, next) {
        // console.log('body', req.body)
        // console.log('header', req.decoded)
        let totalRps = Number(req.body.totalRps) * Number(req.body.qty);
        Cart.findOne({
                itemId: req.body.idItem
            })
            .then(item => {
                console.log('itemada', item)
                if (item) {
                    let newTotalRps = Number(item.totalRps) + Number(totalRps)
                    let newCount = Number(item.count) + Number(req.body.qty)
                    return Cart.updateOne({
                        itemId: req.body.idItem
                    }, {
                        count: Number(newCount),
                        totalRps: newTotalRps
                    }, {
                        new: true
                    })
                } else {
                    return Cart.create({
                        userId: req.decoded.id,
                        itemId: req.body.idItem,
                        count: Number(req.body.qty),
                        totalRps
                    })
                }
            })
            .then(newData => {
                // console.log(newData)
                res.status(201).json(newData)
            })
            .catch(next)
    }

    static infoCart(req, res, next) {
        // console.log('masuk info cart')
        Cart.find({
                userId: req.decoded.id
            })
            .populate('itemId')
            .then(items => {
                // console.log(items)
                res.status(200).json(items)
            })
            .catch(next)
    }

    static removeItem(req, res, next) {
        // console.log(req.params.itemId)
        Cart.deleteOne({
                itemId: req.params.itemId
            })
            .then(data => {
                // console.log(data)
                res.status(200).json(data)
            })
            .catch(next)
    }

    static removeCart(req, res, next) {
        console.log('masuk controller delete')
        Cart.deleteMany({})
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }
}

module.exports = CartController;