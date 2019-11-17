const Product = require('../models/product')

class productController {

    static findAll(req, res, next) {
        console.log('masuk findAll')
        Product.
            find()
            .then (products => {
                res.json(products)
            })
            .catch(next)
    }
    
    static findOne(req, res, next) {
        console.log('masuk findone', req.params.id)
        Product.
            findById(req.params.id)
            .then((product) => {
                if (product) {
                    res.json(product)
                } else {
                    next({
                        status : 404,
                        msg : 'product not found'
                    })
                }
                
            })
            .catch(next)
    }

    static create(req, res, next) {
        console.log('masuk add')
        console.log(req.body)
        const {price, qty, name, image, category} = req.body
        Product.
            create({
                price,
                qty,
                user : req.user._id,
                name,
                image,
                category
            })            
            .then(product => {                
                res.status(201).json(product)
            })
            .catch(next)
    }

    static delete(req, res, next) {
        console.log('masuk delete')
        Product
            .findOneAndDelete({
                _id : req.params.id
            })
            .then(product => {
                if (product) {
                    res.json({
                        msg : 'product succesfully deleted'
                    })
                } else {
                    next({
                        status : 404,
                        name : 'product not found'
                    })
                }
            })
            .catch(next)
    }

    static update(req, res, next) {
        console.log('masuk update')
        let {price, qty, name, image, category} = req.body
        Product.
            findOneAndUpdate({
                _id : req.params.id
            }, {
                price,
                qty,
                user : req.user._id,
                name,
                image,
                category
            },{
                new : true
            }).
            then(product => {
                if (product) {
                    res.json(product)
                } else {
                    next({
                        status : 404,
                        msg : 'product not found'
                    })
                }
                
            })
            .catch(next)
    }
}

module.exports = productController