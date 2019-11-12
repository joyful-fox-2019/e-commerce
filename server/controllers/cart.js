const Cart = require('../models/Cart');

class CartController {
    static create(req, res, next) {
        const { UserId, ProductId } = req.body;
        Cart
            .create({
                UserId,
                ProductId
            })
            .then( data => {
                res.status(201).send(data);
            })
            .catch( err => {
                next(err);
            })
    }

    static showAll(req, res, next) {
        Cart
            .find()
            .then( carts => {
                res.status(200).json(carts);
            })
            .catch( err => {
                next(err);
            })
    }

    static showOne(req, res, next) {
        Cart
            .findById(req.params.id)
            .then( cart => {
                if (!cart) {
                    let err = {
                        status: 404,
                        msg: 'cart not found'
                    }
                    next(err)
                } else {
                    if (cart.UserId == req.decoded.id) {
                        res.status(200).json(cart);
                    } else {
                        let err = {
                            status: 400,
                            msg: 'You are not authorized'
                        }
                        next(err);
                    }    
                }
            })
            .catch( err => {
                next(err);
            })
    }

    static delete(req, res, next) {
        Cart
            .findById(req.params.id)
            .then( cart => {
                if (!cart) {
                    let err = {
                        status: 404,
                        msg: 'cart not found'
                    }
                    next(err);
                } else {
                    console.log(cart)
                    if (req.decoded.id == cart.UserId) {
                        if (!cart) {
                            let err = {
                                status: 404,
                                msg: 'cart not found'
                            }
                            next(err)
                        } else {
                            res.status(204).json(cart)
                        }  
                    } else {
                        let err = {
                            status: 401,
                            msg: 'You are not authorized.'
                        }
                        next(err);
                    }
                }   
            })
            .catch(err => {
                console.log(err)
                next(err);
            })
    }
}

module.exports = CartController;