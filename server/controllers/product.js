const Product = require('../models/Product')

module.exports = {
  find: (req, res, next) => {
    Product.find()
      .then(products => {
        res.status(200).json(products)
      })
      .catch(next)
  },
  create: (req, res, next) => {
    const { name, description, price, stock, published, writer, penciler, image } = req.body
    Product.create({ name, description, price, stock, published, writer, penciler, image })
      .then(product => {
        res.status(201).json(product)
      })
      .catch(next)
  }
}