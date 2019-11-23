const Item = require('../models/item')

class ItemController {
    static create(req, res, next) {
        let {
            name,
            stock,
            category,
            rps,
            image
        } = req.body
        Item.create({
                name,
                stock: Number(stock),
                category,
                rps: Number(rps),
                image
            })
            .then(respone => {
                res.status(201).json(respone)
            })
            .catch(next)
    }

    static getAll(req, res, next) {
        // console.log(req.body)
        Item.find({
                category: req.params.category
            })
            .then(items => {
                res.status(200).json(items)
            })
            .catch(next)
    }

    static getDetail(req, res, next) {
        // console.log('masuk getOne')
        Item.findOne({
                _id: req.params.id
            })
            .then(item => {
                // console.log('masuk one')
                // console.log(item)
                res.status(200).json(item)
            })
            .catch(next)
    }

    static remove(req, res, next) {
        Item.deleteOne({
                _id: req.params.id
            })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }

    static update(req, res, next) {
        // console.log('masuk update')
        // console.log(req.body)
        let {
            name,
            stock,
            category,
            rps,
            image
        } = req.body
        let id = req.params.id
        Item.findByIdAndUpdate({
                _id: id
            }, {
                name,
                stock,
                category,
                rps,
                image
            }, {
                new: true
            })
            .then(item => {
                res.status(200).json(item)
            })
            .catch(next)
    }
}

module.exports = ItemController;