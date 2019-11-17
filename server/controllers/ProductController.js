const Product = require('../models/product')

class ProductController {
    static create(req, res, next) {
        let { name, price, stock } = req.body
        let image = req.file.cloudStoragePublicUrl
        if(!name || !price || !stock || !image) {
            res.send(400).json({ message: 'bad request'})
        } else {
            Product.create({ name, price: Number(price), stock, image })
                .then(result => {
                    res.status(201).json(result)
                })
                .catch(next)
        }
    }

    static readAll(req, res, next) {
        Product.find()
            .then(products => {
                res.status(200).json(products)
            })
            .catch(next)
    }

    static readOne(req, res, next) {
        let { id } = req.params
        Product.findById(id)
            .then(product => {
                if(product) res.status(200).json(product)
                else next({ status: 404, message: 'product not found' })
            })
            .catch(next)
    }

    static updateField(req, res, next) {
        let { id } = req.params
        let { name, price, stock } = req.body
        let image = req.file.cloudStoragePublicUrl
        if(!name || !price || !stock || !image) {
            res.status(400).json({ message: 'bad request'})
        } else {
            Product.findByIdAndUpdate({ _id:id }, {  name, price: Number(price), stock, image })
                .then(result => {
                    res.status(200).json(result)
                })
                .catch(next)
        }
    }

    static deleteProduct(req, res, next) {
        let { id } = req.params
        Product.deleteOne({ _id: id })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(next)
    }
}

module.exports = ProductController