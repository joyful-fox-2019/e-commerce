const Category = require('../models/category')

class categoryController {
    static getAll(req, res, next) {
        Category.find()
            .then(categories => {
                res.status(200).json(categories)
            })    
            .catch(next)
    }

    static getOne(req, res, next) {
        Category.findById(req.params.id).populate('product')
            .then(category => {
                res.status(200).json(category)
            })
            .catch(next)
    }

    static create(req, res, next) {
        const createdCategory = {
            name: req.body.name
        }

        Category.create(createdCategory)
            .then(category => {
                res.status(201).json({
                    category, msg: 'New category is successfully created'
                })
            })
            .catch(next)
    }
}

module.exports = categoryController