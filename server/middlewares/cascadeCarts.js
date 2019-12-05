const Cart = require('../models/Cart')

module.exports = (req, res, next) => {
  let promises = []
  let boughtProducts = []
  req.carts.forEach(cart => {
    promises.push(Cart.findByIdAndDelete(cart._id))
    boughtProducts.push({
      _id: cart.product,
      qty: cart.qty
    })
  })
  Promise.all(promises)
    .then(carts => {
      console.log(carts)
      req.boughtProducts = boughtProducts
      next()
    })
    .catch(next)
}