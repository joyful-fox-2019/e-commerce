const Product = require('../models/Product')

class ControllerProduct {
  static fetchAll(req, res, next) {
    Product
      .find()
      .then(products => {
        res.status(200).json(products)
      })
      .catch(next)
  }

  static add(req, res, next) {
    const { name, price, qty, description, imageUrl, author } = req.body
    Product
      .create({
        name, price, qty, description, imageUrl, author
      })
      .then(product => {
        res.status(201).json({
          message: 'Successfully added a product!',
          product
        })
      })
      .catch(next)
  }

  static fetchOne(req, res, next) {
    const { id } = req.params
    Product
      .findById(id)
      .then(product => {
        // console.log("ini product di findbyid", product);
        if (!product) throw {
          name: 'NotFound',
          status: 404,
          message: 'Product not found!'
        }
        res.status(200).json({ product })
      })
      .catch(next)
  }

  static update(req, res, next) {
    // const { }
  }

  static delete(req, res, next) {
    const { id } = req.params
    Product
      .findOneAndDelete({ _id: id })
      .then(product => {
        // console.log('ini response dari delete product', product)
        if (!product) throw {
          name: 'NotFound',
          status: 404,
          message: 'Product not found!'
        }
        res.status(200).json({ 
          message: 'Successfully deleted a product!',
          product 
        })
      })
      .catch(next)
  }
}

module.exports = ControllerProduct
