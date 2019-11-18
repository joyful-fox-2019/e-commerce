const Product = require('../models/Product');

class ProductController {
    static create(req, res, next) {
        if (req.decoded.isAdmin == false) {
            let err = {
                status: 400,
                msg: 'You are not authorized.'
            }
            next(err);
        } else {
            const { name, price, image, category, stock } = req.body;
            Product
                .create({
                    name,
                    price,
                    image,
                    category,
                    stock
                })
                .then( product => {
                    res.status(201).json(product);
                })
                .catch( err => {
                    next(err);
                })
        }  
    }

    static showAll(req, res, next) {
        Product
            .find()
            .then( products => {
                res.status(200).json(products);
            })
            .catch( err => {
                next(err);
            })
    }

    static showOne(req, res, next) {
        Product
            .findById(req.params.id)
            .then( product => {
                if (!product) {
                    let err = {
                        status: 404,
                        msg: 'product not found'
                    }
                    next(err)
                } else {
                    res.status(200).json(product);
                }
            })
            .catch( err => {
                next(err);
            })
    }

    static delete(req, res, next) {
        Product
            .findById(req.params.id)
            .then( product => {
                if (req.decoded.isAdmin == false) {
                    let err = {
                        status: 400,
                        msg: 'You are not authorized.'
                    }
                    next(err);
                } else {
                    if (!product) {
                        let err = {
                            status: 404,
                            msg: 'product not found'
                        }
                        next(err)
                    } else {
                        res.status(204).json(product)
                    }  
                }
            })
            .catch(err => {
                next(err);
            })
    }
}

module.exports = ProductController;