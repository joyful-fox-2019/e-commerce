const Product = require('../models/product')

class ProductController {
    static showAllProduct(req, res, next) {
        Product.find({})
            .then(products => {
                res.status(200).json({
                    message: 'Success fetching all products',
                    products
                })
            })
            .catch(next)
    }

    static createProduct(req, res, next) {
        if (!req.file) {
            req.body.image = null
        } else {
            req.body.image = req.file.cloudStoragePublicUrl
        }
        Product.create({
                name: req.body.name,
                price: Number(req.body.price),
                stock: Number(req.body.stock),
                image: req.body.image,
                description: req.body.description
            })
            .then(product => {
                res.status(201).json({
                    message: 'Product successfully created',
                    product
                })
            })
            .catch(next)
    }

    static updateProduct(req, res, next) {
        let objUpdate = {}
        if (req.file && req.file.cloudStoragePublicUrl) {
            objUpdate = {
                name: req.body.name,
                price: req.body.price,
                stock: req.body.stock,
                image: req.file.cloudStoragePublicUrl,
                description: req.body.description
            }
        } else {
            objUpdate = {
                name: req.body.name,
                price: req.body.price,
                stock: req.body.stock,
                description: req.body.description
            }
        }
        Product.findByIdAndUpdate(req.params.id, objUpdate)
            .then(product => {
                res.status(200).json({
                    message: 'Product successfully updated',
                    product
                })
            })
            .catch(next)
    }

    static deleteProduct(req, res, next) {
        Product.findByIdAndRemove(req.params.id)
            .then(product => {
                res.status(200).json({
                    message: 'Product successfully deleted',
                    product
                })
            })
            .catch(next)
    }
}

module.exports = ProductController