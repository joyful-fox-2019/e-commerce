const Cart = require('../models/cart')
const Product = require('../models/product')

class CartController {
  static addToCart(req, res, next) {
    let { id } = req.logedUser
    let { qty } = req.body
    let { idProduct } = req.params

    if (qty <= 0) throw next({ status: 400, msg: 'Cannot buy product without quantity!' })
    Product.findById(idProduct)
      .then(product => {
        if (product.stock == 0) {
          throw next({ status: 400, msg: `Sorry this product out of stock!` })
        } else if (qty > product.stock) {
          throw next({ status: 400, msg: `Sorry you are cannot buy product more then product stock!!` })
        } else {
          return Cart.find({ idUser: id, idProduct: idProduct, status: false })
        }
      })
      .then(cart => {
        if (cart.length == 1) {
          throw next({ status: 403, msg: `This product is already in your cart bucket, please open your cart bucket to procces your transaction!` })
        } else {
          return Cart.create({
            idUser: id,
            idProduct,
            qty
          })
        }
      })
      .then(cart => {
        res.status(201).json(cart)
      })
      .catch(next)
  }

  static updateQty(req, res, next) {
    let { qty } = req.body
    let { idCart } = req.params
    Cart.findByIdAndUpdate(idCart, { $set: { qty: qty } }, { runValidators: true, new: true })
      .then(cart => {
        res.status(200).json(cart)
      })
      .catch(next)
  }

  static showCart(req, res, next) {
    let { id } = req.logedUser
    Cart.find({ idUser: id, status: false }).populate('idProduct')
      .then(carts => {
        res.status(200).json(carts)
      })
      .catch(next)
  }

  static deleteCart(req, res, next) {
    let { idCart } = req.params
    Cart.findByIdAndDelete(idCart)
      .then(respon => {
        res.status(200).json(respon)
      })
      .catch(next)
  }
}

module.exports = CartController