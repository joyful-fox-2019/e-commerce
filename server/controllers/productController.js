const Product = require('../models/product')
const { deleteFile } = require('../helpers/gcs')

class ProductController {
  static all(req, res, next) {
    Product.find()
      .then(results => {
        res.status(200).json(results)
      })
      .catch(next)
  }
  static one(req, res, next) {
    let { id } = req.params
    Product.findOne({ _id: id })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }
  static create(req, res, next) {
    let { name, image, price, stock } = req.body
    Product.create({ name, image, price, stock })
      .then(result => {
        res.status(201).json(result)
      })
      .catch(next);
  }
  static update(req, res, next) {
    let { id } = req.params
    let { name, image, description, price, stock } = req.body
    Product.findOneAndUpdate({
      _id: id
    }, {
      name,
      image,
      description,
      price,
      stock
    },{runValidators: true})
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }
  static delete(req, res, next) {
    let { id } = req.params
    Product.findOneAndDelete({
      _id: id
    })
      .then(result => {
        if(result.image) {
          deleteFile(result.image)
        }
        res.status(200).json(result)
      })
      .catch(next)
  }
  static minus(req, res, next) {
    let { stock } = req.body
    Product.findOneAndUpdate({
      _id: req.params.id
    }, {
      stock
    })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }
}

module.exports = ProductController