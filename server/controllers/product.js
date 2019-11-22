const Product = require('../models/product')

class ProductController {
    static getAllProduct(req, res, next) {
        Product.find()
            .then(products => {
                res.status(200).json(products)
            })
            .catch(err => {
                next(err)
            })
    }

    static getProduct(req,res,next){
        Product.findOne({
            _id: req.params.id
        })
        .then(product => {
            res.status(200).json(product)
        })
        .catch(err => {
            next(err)
        })
    }

    static createProduct(req, res, next) {
        Product.create({
                productName: req.body.name,
                description: req.body.desc,
                quantity: req.body.quantity,
                price: req.body.price,
                imageUrl: req.body.url
            })
            .then(product => {
                res.status(201).json(product)
            })
            .catch(err => {
                next(err)
            })
    }

    static editProduct(req, res, next) {
        Product.findOne({
                _id: req.params.id
            })
            .then(product => {
                let oldProduct = product
                return Product.updateOne({
                    productName: req.body.name || oldProduct.productName,
                    description: req.body.desc || oldProduct.description,
                    quantity: req.body.quantity || oldProduct.quantity,
                    price: req.body.price || oldProduct.price
                })
            })
            .then(success => {
                res.status(200).json({
                    message: "Update Success"
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static deleteProduct(req, res, next) {
        Product.deleteOne({
                _id: req.params.id
            })
            .then(success => {
                res.status(200).json({
                    message: "Delete product sucess"
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static async uploadGCS(req,res,next){
        try {
          let _id = req.user.id
          let name = req.file.originalname
          let location = req.file.cloudStoragePublicUrl
          let data = {name,location}
          res.status(201).json(data)
        } catch (error) {
          next(error)
        }
      }
}

module.exports = ProductController