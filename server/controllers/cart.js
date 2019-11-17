const Cart = require('../models/Cart');

class CartController {
    static create(req, res, next) {
        const { ProductId } = req.body;
        Cart
            .create({
                UserId: req.decoded.id,
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

    static showOneLatest(req, res, next) {
        Cart
            .findOne({UserId: req.decoded.id})
            .then(data => {
                res.status(200).send(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static addToCart(req, res, next) {
        let arr = [];
        let length = Number(req.body.product.quantity);
        for (let i = 0; i < length; i++) {
            arr.push(req.body.product.id)
        }
        Cart
            .findOneAndUpdate(
                { _id: req.params.id }, 
                { $push: {
                    ProductId: { $each: arr } } }
            )
            .then(data => {
                res.status(201).send(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static removeFromCart(req, res, next) {
        Cart
            .findOne({_id: req.params.id})
            .then(data => {
                console.log(data)
                for (let i = 0; i < data.ProductId.length; i++) {
                    if (data.ProductId[i] == req.body.ProductId) {
                        data.ProductId.splice(i, 1);
                        break;
                    }
                }
                return Cart
                    .findOneAndUpdate({
                        _id: req.params.id, 
                    },{
                        ProductId: data.ProductId
                    })
            })
            .then(cart => {
                res.status(201).send(cart)
            })
            .catch(err => {
                next(err)
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