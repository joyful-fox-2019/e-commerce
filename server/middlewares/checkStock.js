const Product = require('../models/product')

module.exports = (req, res, next) => {
  let { product, quantity } = req.body
  Product.findOne({ _id: product })
    .then(product => {
      if (product.stock < quantity) {
        let err = new Error('Stock is less than requested quantity')
        err.status = 400
        throw err
      } else if(quantity < 0) {
        let err = new Error('Quantity must be greater than zero')
        err.status = 400
        throw err
      } else {
        next()
      }
    })
    .catch(next)
}