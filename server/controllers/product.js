const Product = require('../models/product')

class ProductController {
  static find(req, res, next) {
    Product.find()
      .then(products => {
        res.status(200).json(products)
      })
      .catch(next)
  }
  static findOne(req, res, next) {
    let id = req.params.id
    Product.findById(id)
      .then(product => {
        res.status(200).json(product)
      })
      .catch(next)
  }
  static create(req, res, next) {
    const { name, imageSource, price, description, stock } = req.body
    Product.create({ name, imageSource, price, description, stock }) 
      .then(product => {
        res.status(201).json(product)
      })
      .catch(next)
  }
  static update(req, res, next) {
    let id = req.params.id
    const { name, imageSource, price, description, stock } = req.body
    Product.findByIdAndUpdate(id, { name, imageSource, price, description, stock}, { omitUndefined: true, new: true, runValidators: true, useFindAndModify: false })
      .then(product => {
        res.status(200).json(product)
      })
      .catch(next)
  }
  static delete(req, res, next) {
    let id = req.params.id
    Product.findByIdAndDelete(id)
      .then(product => {
        res.status(200).json(product)
      })
      .catch(next)
  }
}

module.exports = ProductController