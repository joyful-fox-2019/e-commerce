const Cart = require('../models/cart')
const Product = require('../models/product')

class cartController {
  static getOne(req, res, next) { //Cart-BUTTON in Navbar (HOME)
    Cart.findOne({
      user: req.LoggedUser.id
    })
      .then(cart => {
        res.status(200).json(cart)
      })   
      .catch(next)
  }

  static addProductToCart(req, res, next) { //Add to Product's BUTTON (HOME)
    Cart.findOneAndUpdate({ user: req.LoggedUser.id }, {
      $push: {
        product: req.body.product
      }
    })
      .then(cart => {
        return Product.findByIdAndUpdate(req.body.product.id, {
          stock: req.body.product.stock - Number(req.body.product.qty)
        })
      .then(product => {
        res.status(200).json({
          product, msg: 'Product is successfully added to the cart'
        })
      })
    })
      .catch(next)
  }

  static removeProductInCart(req, res, next) { //Remove BUTTON (CART)
    Cart.findOneAndUpdate({ user: req.LoggedUser.id }, {
      $pull: {
        product: req.body.product
      }
    })
      .then(cart => {
        return Product.findByIdAndUpdate(req.body.product.id, {
          stock: req.body.product.stock + Number(req.body.product.qty)
        })
      .then(product => {
        res.status(200).json({
          cart, msg: 'Product is successfully removed to the cart'
        })
      })
    })
      .catch(next)
  }
}

module.exports = cartController

// let product_qty = null
//     if (req.body.product.qty <= 0 || req.body.product.qty > req.body.product.stock) {
//       res.status(400).json({
//         msg: 'Bad Request'
//       }) 
//     } else {
//       Cart.findOne({ user: req.LoggedUser.id })
//         .then(cart => {
//           console.log(cart)
//           for (let i = 0; i < cart.product.length; i++) {
//             if (req.body.product === cart.product[i]) {
//               product_qty = cart.product[i].qty + 1
//               cart.product[i].qty = product_qty
//               return Cart.findOneAndUpdate ({ user: req.LoggedUser.id }, {
//                 cart: cart.product[i]
//               })
//             } else {
//               return Cart.findOneAndUpdate({ user: req.LoggedUser.id }, {
//                 $push: {
//                   product: req.body.product
//                 }
//               })
//                 .then(cart => {
//                   res.status(200).json({
//                     cart, msg: 'Product is successfully added to the cart'
//                   })
//                 })
//                 .catch(next)
//             }
//           }
//         })
//     }

// static addProductToCart(req, res, next) { //Add to Product's BUTTON (HOME)
//     if (Number(req.body.product.qty) <= 0 || Number(req.body.product.qty) > req.body.product.stock) {
//       res.status(400).json({
//         msg: 'Bad Request'
//       }) 
//     } else {
//       Cart.findOne({ user: req.LoggedUser.id })
//         .then(cart => {
//           // for (let i = 0; i < cart.product.length; i++) {
//           //   if (cart.product[i].name = req.body.product.name) {
//           //     // return Cart.findByIdAndUpdate({ user: req.LoggedUser.id }, {
//           //     //   qty: cart.product[i].qty + 1
//           //     // })
//           //   } else {

//           //   }
//           // }
//               return Cart.findOneAndUpdate({ user: req.LoggedUser.id }, {
//                 $push: {
//                   product: req.body.product
//                 }})    
            
          
//         })
//         .then(product => {
//           res.status(200).json({
//             msg: 'Product is successfully added to the cart'
//           })
//         })
//         .catch(next)
      
//     }
//   }