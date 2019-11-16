const Product = require("../models/Product")

class ProductController {
    static create(req, res, next) {
        console.log(req.loggedUser)
        let { product, stock, category, price, imageData } = req.body
        console.log(imageData)
        Product.create({
            product,
            stock,
            category,
            SellerId: req.loggedUser.id,
            price,
            sold: 0,
            picture: imageData
        })
        .then (result => {
            res.status(201).json(result)
        })
        .catch (err => {
            next(err)
        })
    }

    static findAll(req, res, next) {
        Product.find({
            SellerId: req.loggedUser.id
        })
        .then (result => {
            res.status(200).json(result)
        })
        .catch (err => {
            next(err)
        })
    }

    static findAllProduct(req, res, next) {
        Product.find()
        .then (result => {
            res.status(200).json(result)
        })
        .catch (err => {
            next(err)
        })
    }

    static update(req, res, next) {
        let { product, stock, price } = req.body
        let { id } = req.params
        Product.findOneAndUpdate({
            _id: id
        }, {
            product,
            stock,
            price
        })
        .then (result => {
            res.status(200).json(result)
        })
        .catch (err => {
            next(err)
        })
    }

    static delete(req, res, next) {
        let { id } = req.params
        Product.findOneAndDelete({
            _id: id
        })
        .then (() => {
            res.status(200).json({
                msg: "Berhasil dihapus"
            })
        })
        .catch (err => {
            next(err)
        })
    }

    static findOne(req, res, next) {
        let { id } = req.params
        Product.findOne({
            _id: id
        })
        .then (result => {
            res.status(200).json(result)
        })
        .catch (err => {
            next(err)
        })
    }
}

module.exports = ProductController