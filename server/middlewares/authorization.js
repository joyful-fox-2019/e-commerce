const Product = require('../models/product')

module.exports = (req, res, next) => {
    Product.findById(req.params.id)
        .then(product => {
            if (product && product.seller == req.decoded.id) {
                next()
            } else {
                throw 'Product not found'
            }
        })
        .catch(next)
}