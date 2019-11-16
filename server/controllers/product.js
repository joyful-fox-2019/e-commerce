const Product = require('../models/Product')

module.exports = {
  find: (req, res, next) => {
    Product.find()
      .then(products => {
        res.status(200).json(products)
      })
      .catch(next)
  },
  findOne: (req, res, next) => {
    Product.findById(req.params.id)
      .then(product => {
        if(!product) {
          throw { status: 404, msg: 'No comic found'}
        } else {
          res.status(200).json(product)
        }
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