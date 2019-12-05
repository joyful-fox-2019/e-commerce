const Product = require('../models/Product')

module.exports = (req, res, next) => {
  let promises = []
  req.boughtProducts.forEach(boughtProduct => {
    promises.push(Product.findByIdAndUpdate(boughtProduct._id, { $inc: { stock: (boughtProduct.qty * -1)} }))
  })
  Promise.all(promises)
    .then(products => {
      res.status(200).json(req.transaction)
    })
    .catch(next)
}