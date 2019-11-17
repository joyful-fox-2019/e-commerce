const Item = require('../models/item')

class itemController {

    static create(req,res,next) {
        const image = req.file ? req.file.cloudStoragePublicUrl : ''
        const { name, description, stock} = req.body
        const price = Number(req.body.price)
        Item.create({
            name,
            description,
            image, 
            price,
            stock
        })
            .then((newItem) => {
                res.status(201).json({newItem, message: 'success add item'})
            }).catch(next)
    }

    static showAll(req,res,next) {
        Item.find()
            .then((items) => {
                res.status(200).json({items})
            }).catch(next)
    }

    static showOne(req,res,next) {
        const { id } = req.params
        Item.findById(id)
            .then((item) => {
                if (!item) throw ({message: 'data not found'})
                res.status(200).json({item})
            }).catch(next)
    }

    static update(req,res,next) {
        const { id } = req.params
        const update = {}
        for (let key in req.body) {
            update[key] = req.body[key]
        }
        Item.findByIdAndUpdate(id, update)
            .then((item) => {
                if (!item) throw ({message: 'data not found'})
                res.status(200).json({item, message: 'success update item'})
            }).catch(next)
    }

    static delete(req,res,next) {
        const { id } = req.params
        Item.findByIdAndDelete(id)
            .then((item) => {
                if (!item) throw ({message: 'data not found'})
                res.status(200).json({item, message: 'success delete item'})
            }).catch(next)
    }
}

module.exports = itemController