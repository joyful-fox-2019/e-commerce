const Product = require('../models/product')
const User = require('../models/user')


class ProductController {

    static readAll (req,res,next) {
        Product.find({}).populate('userId')
            .then(function (products) {
                res.status(200).json(products)
            })
            .catch(next)
    }

    static readMe (req,res,next) {
        Product.find({userId: req.decoded.id})
            .then(function (products) {
                res.status(200).json(products)
            })
            .catch(next)
    }

    static create (req,res,next) {
        let userId = req.decoded.id
        Product.create({
            productName: req.body.productName,
            description: req.body.description,
            stocks: Number(req.body.amounts),
            price: req.body.price,
            image: req.body.file,
            userId: userId
        })
        .then(function (product) {
            console.log(product)
            User.updateOne({_id: userId}, {$push: {shop: product}})
                .then(function(user) {
                    res.status(202).json({user, message: `Your Product added with success!`})
                })
        })
        .catch(next)
    }

    static delete (req,res,next) {
        let productId = req.params.productId
        Product.findOneAndDelete({_id: productId})
            .then(function (product) {
                res.status(202).json({message: `${product.productName} has been deleted`})
            })
            .catch(next)
    }

    static updateProduct (req,res,next) {
        let productId = req.params.productId
        let { productName, amount, description, category } = req.body
        Product.findOneAndUpdate(
            {
                _id: productId
            },
            {
                productName,amount, description
            },
            {
                omitUndefined: true,
                new: true
            }
        )
            .then(function (product) {
                res.status(202).json({message: `Product ${product.productName} Successfully updated`})
            })
            .catch(next)
    }

    

}

module.exports = ProductController