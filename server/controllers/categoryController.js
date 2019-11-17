const Category = require('../models/category')
const Product = require('../models/product')

class categoryController {
  static getAll(req, res, next) {
    Category.find()
      .then(categories => {
        res.status(200).json(categories)
      })  
      .catch(next)
  }

  static getOne(req, res, next) {
    Product.find({
      category: req.params.name
    })
      .then(products => {
        res.status(200).json(products)
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