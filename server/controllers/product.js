const { product } = require("../models")

class ProductController {
  static add(req, res, next) {
    const { name, price, stock, image } = req.body
    product
      .create({
        name,
        price,
        stock,
        image,
        seller: req.loggedUser._id
      })
      .then(result => {
        res.status(201).json(result)
      })
      .catch(next)
  }
  static get(req, res, next) {
    product
      .find()
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }
  static getId(req, res, next) {
    product
      .findById(req.params.id)
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }
  static updateStock(req, res, next) {
    const { stock } = req.body
    product.findByIdAndUpdate(req.params.id, {
      stock
    }).then(result => {
      res.status(200).json(result)
    })
      .catch(next)
  }
  static updatePrice(req, res, next) {
    const { price } = req.body
    product.findByIdAndUpdate(req.params.id, {
      price
    }).then(result => {
      res.status(200).json(result)
    })
      .catch(next)
  }
  static delete(req, res, next) {
    product
      .findByIdAndDelete(req.params.id)
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }
}

module.exports = ProductController
