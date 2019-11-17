const Cart = require('../models/cart')
const Product = require('../models/product')

class CartController {
  static addCart(req, res, next){
    const { id } = req.params
    const { quantity } = req.body
    const owner = req.user.id
    if(quantity < 1) throw next({ status: 400, message: 'Amount Dont Lower Than 1'})
    Product.findById(id)
      .then( data => {
        if(data.stock <= 0){
          throw next({ status: 400, message: 'Stock is Empty'})
        } else if (quantity > data.stock) {
          throw next({ status: 400, message: 'Your Amount Greather Than Product Stock'})
        } else {
          return Cart.findOne({ product: id, owner }).populate(['product', 'owner'])
        }
      })
      .then( data => {
        if(data){
          const idProduct = data.product._id
          return Cart.findOneAndUpdate({ product: idProduct}, { quantity })
        } else {
          return Cart.create({ product:id, quantity, owner })
        }
      })
      .then( result => {
        res.status(200).json(result)
      })
      .catch(next)
  }

  static findCart(req, res, next){
    const owner = req.user.id
    Cart.find({ owner })
      .populate(['product', 'owner'])
      .then( data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static delete(req, res, next){
    const { id } = req.params
    Cart.findByIdAndRemove(id)
      .then(result => {
        res.status(200).json({ message: `Cart Item was Deleted` })
      })
      .catch(next)
  }
}

module.exports = CartController