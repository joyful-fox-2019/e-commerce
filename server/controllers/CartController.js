const Cart = require('../models/cart')

class CartController {
  static read(req, res, next){
    Cart.find({userId:req.loggedUser._id})
      .populate('userId')
      .populate('productId')
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static create(req, res, next){
    let { productId } = req.body

    Cart.findOne({productId})
      .then(cart => {
        if(cart){
          return Cart.findByIdAndUpdate({_id:cart._id}, {qty: cart.qty+1})
        }
        else{
          return Cart.create({
            userId: req.loggedUser._id,
            productId: req.body.productId
          })
        }
      })
      .then(data => {
        res.status(201).json(data)
      })
      .catch(next)
  }

  static delete(req, res, next){
    Cart.findByIdAndDelete({_id:req.params.id})
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }
}

module.exports = CartController
