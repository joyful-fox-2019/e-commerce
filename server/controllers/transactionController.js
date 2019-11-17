const Transaction = require('../models/transaction')
const User = require('../models/user')
const Cart = require('../models/cart')
const Product = require('../models/product')
const mongoose = require('mongoose')
const Types = mongoose.Types

class transactionController {
  static inputTrackNumber (req, res, next) {
    Transaction.findByIdAndUpdate(req.params.id, {
      trackNumber: req.body.trackNumber,
      trackNumberFilled: true
    })
      .then(transaction => {
        res.status(200).json({
          msg: 'Successfully input the track number'
        })
      })
      .catch(next)
  }

  static confirmArrived (req, res, next) {
    Transaction.findByIdAndUpdate(req.params.id, {
      status: true,
      clearStatus: 'Finished'
    })
      .then(transaction => {
        res.status(200).json({
          msg: 'Transaction is completed'
        })
      })
      .catch(next)
  }

  static getOne (req, res, next) {
    Transaction.find({user: req.LoggedUser.id}).populate('user')
      .then(transaction => {
        res.status(200).json(transaction)
      })
      .catch(next)
  }

  static getCompleted (req, res, next) {
    Transaction.find({status: true}).populate('user')
      .then(transaction => {
        res.status(200).json(transaction)
      })
      .catch(next)
  }

  static getUncompleted (req, res, next) {
    Transaction.find({status: false}).populate('user')
      .then(transaction => {
        res.status(200).json(transaction)
      })
      .catch(next)
  }

  static checkout(req, res, next) {
    console.log(req.body)
    const createdTransaction = {
      user: req.LoggedUser.id,
      cart: req.body.cart,
      total: req.body.total,
      product: req.body.product
    }
    // let productsInCart = []

    Transaction.create(createdTransaction)
      .then(transaction => {
        return Cart.findById(req.body.cart)
          .then(cart => {
            // productsInCart = cart.product 
            // for (let i = 0; i < productsInCart.length; i++) {
            //   productsInCart[i]["id"] = Types.ObjectId(productsInCart[i]["id"])
            // }
            return Cart.findByIdAndUpdate(cart._id, {
              product: []
            })
          })
      })
      .then(product => {
        res.status(201).json({
          msg: 'Transaction is made'
        })
      })
      .catch(next)
  }

  // static checkOut(req, res, next) { //Still need to decrease the stock based on product's quantity
  //   const createdTransaction = {
  //     user: req.LoggedUser.id,
  //     cart: req.params.id
  //   }

  //   let productsInCart = []

  //   Cart.findById(req.body.cart)
  //     .then(cart => {
  //       productsInCart = cart.product

        // for (let i = 0; i < productsInCart.length; i++) {
        //   productsInCart[i]["id"] = Types.ObjectId(productsInCart[i]["id"])
        // }

  //       return Transaction.create(createdTransaction) 
  //     })
  //     .then(transaction_data => {
  //       return User.findByIdAndUpdate(req.LoggedUser.id, { 
  //         $push: {
  //           transaction: transaction_data._id
  //         }
  //       })
  //     })
  //     // .then(user => {
  //     //   return Cart.findByIdAndDelete(req.params.id) 
  //     // })
  //     .then(cart => {
  //       return Product.find()
  //     })
  //     .then(product => {
  //       const promises = []
  //       for (let i = 0; i < productsInCart.length; i++) {
  //         for (let j = 0; j < product.length; j++) {
  //           console.log('productsInCart[i]', typeof productsInCart[i]["id"])
  //           console.log('product[j]', typeof product[j]["_id"])
  //           if (productsInCart[i].id == product[j]._id) {
  //             console.log('masuk gan')
              // promises.push(Product.findByIdAndUpdate(product[j]._id, {
              //   stock: product[j].stock - productsInCart[i].qty
              // }))
  //           }
  //         }
  //       }

        // Promise.all(promises)
        //   .then(res => {
        //     console.log('res', res)
        //   })
        //   .catch(next)
      // })
      // .catch(next)

  //   Transaction.create(createdTransaction)
  //     .then(transaction_data => {
  //       return User.findByIdAndUpdate(req.LoggedUser.id, {
  //         cart: [],
  //         $push: {
  //           transaction: transaction_data._id
  //         }
  //       })
  //     })
  //     .then(user => {
  //       return Cart.findByIdAndDelete(req.params.id)
  //     })
  //     .then(cart => {
  //       return 
  //     })
  //     .catch(next)
  //   }

  // static checkout(req, res, next) {
  //   console.log(req.body)
  //   const createdTransaction = {
  //     user: req.LoggedUser.id,
  //     cart: req.body.cart,
  //     total: req.body.total,
  //     product: req.body.product
  //   }

  //   let productsInCart = []

  //   Transaction.create(createdTransaction)
  //     .then(transaction => {
  //       return Cart.findById(req.body.cart)
  //         .then(cart => {
  //           productsInCart = cart.product 
  //           for (let i = 0; i < productsInCart.length; i++) {
  //             productsInCart[i]["id"] = Types.ObjectId(productsInCart[i]["id"])
  //           }

  //           return Cart.findByIdAndUpdate(cart._id, {
  //             product: []
  //           })
  //         })
  //         .then(cart => {
  //           return Product.find()
  //         })
  //         .then(products => {
  //           let promises = []
  //           for (let i = 0; i < productsInCart.length; i++) {
  //             for(let j = 0; j < products.length; j++) {
  //               if (productsInCart[i].id == products[j]._id) {
  //                 promises.push(Product.findByIdAndUpdate(product[j]._id, {
  //                   stock: product[j].stock - productsInCart[i].qty
  //                 }))
  //               }
  //             }
  //           }
  //         Promise.all(promises)
  //         .then(res => {
  //           res.status(200).json({
  //             msg: 'Transaction is made'
  //           })
  //         })
  //       })
  //     })
  //     .catch(next)
  // }
}

module.exports = transactionController