const Product = require('../models/Product')

module.exports = {
  find: (req, res, next) => {
    Product.find().sort({ createdAt: 'desc' })
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
    console.log('masukgan', req.body)
    const { name, description, price, stock, published, writer, penciler, image } = req.body
    Product.create({ name, description, price, stock, published, writer, penciler, image })
      .then(product => {
        res.status(201).json(product)
      })
      .catch(next)
  },
  update: (req, res, next) => {
    const { name, description, price, stock, published, writer, penciler } = req.body
    Product.findByIdAndUpdate(req.params.id,
      { name, description, price, stock, published, writer, penciler }, {
      omitUndefined: true,
      new: true,
      runValidators: true
    })
      .then(product => {
        res.status(200).json(product)
      })
      .catch(next)
  },
  delete: (req, res, next) => {
    Product.findByIdAndDelete(req.params.id)
      .then(product => {
        res.status(200).json(product)
      })
      .catch(next)
  }
}