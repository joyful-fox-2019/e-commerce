const Cart = require('../models/cart');

class CartController {
    static create(req, res, next) {
        let totalPayment = Number(req.body.totalPayment) * Number(req.body.qty);
        Cart.findOneAndUpdate({
                userId: req.decoded.id
            }, {
                totalPayment
            }, {
                new: true
            })
            .then(data => {
                if (!data) {
                    Cart.create({
                            userId: req.decoded.id,
                            itemId: req.body.idItem,
                            count: Number(req.body.qty),
                            totalPayment
                        })
                        .then(newData => {
                            // console.log(data)
                            res.status(201).json(newData)
                        })
                } else {
                    res.status(200).json(data)
                }
            })
            .catch(next)
    }

    static infoCart(req, res, next) {
        Cart.find({
                userId: req.decoded.id
            })
            .then(items => {
                console.log(items)
            })
            .catch(next)
    }
}

module.exports = CartController;