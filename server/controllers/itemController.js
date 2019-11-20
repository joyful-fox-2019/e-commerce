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
        console.log('masuk getOne')
        Item.findOne({
                _id: req.params.id
            })
            .then(item => {
                console.log('masuk one')
                console.log(item)
                res.status(200).json(item)
            })
            .catch(next)
    }
}

module.exports = ItemController;