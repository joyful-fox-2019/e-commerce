const Transaction = require('../models/Transaction')
const User = require('../models/User')
const Product = require('../models/Product')

class TransactionController{
  static getTransaction(req, res, next){
    const loggedUser = req.loggedUser
    Transaction.find({
      user_id: loggedUser._id
    })
    .populate('products.product_id')
    .sort({createdAt:'desc'})
      .then(transactions=>{
        res.status(200).json(transactions)
      })
      .catch(next)
  }

  static transactionDone(req, res, next){
    const id = req.params.id
    Transaction.updateOne({_id: id}, {
      status: true
    })
    .sort({createdAt:'desc'})
      .then(num=>{
        res.status(201).json(num)
      })
      .catch(next)
  }

  static async createTransaction(req, res, next){
    try{
      const loggedUser = req.loggedUser
      const user = await User.findOne({
        _id: loggedUser._id
      })
      .populate('cart.product_id')

      if(user.cart.length === 0){
        throw {
          msg: 'Your cart is empty',
          status: 400
        }
      }

      user.cart.forEach(product=>{
        console.log(product);
        
        if(product.product_id.stock - product.amount < 0){
          throw {
            msg: 'stock not enough',
            status: 400
          }
        }
      })

      user.cart.forEach(async product=>{
        const num = await Product.updateOne({_id: product.product_id._id}, {
          stock: product.product_id.stock - product.amount
        })
      })

      let cartTransaction = user.cart
      
      console.log(cartTransaction)
      for(let cart in cartTransaction){
        const product_id = cartTransaction[cart].product_id._id
        cartTransaction[cart].product_id = product_id
      }

      let transactionDone

      Transaction.create({
        user_id: user._id,
        products: cartTransaction
      })
        .then(transaction=>{
          transactionDone = transaction
          return User.updateOne({_id: loggedUser._id}, {
            $set: {cart: []}
          })
        })
        .then(num=>{
          res.status(201).json(transactionDone)
        })
        .catch(next)
    }
    catch(err){
      next(err)
    }
  }

  static adminFind(req, res, next){
    const {user_id} = req.params
    Transaction.find({user_id})
    .sort({createdAt:'desc'})
      .then(transactions=>{
        res.status(200).json(transactions)
      })
      .catch(next)
  }

  static adminFindAll(req, res, next){
    Transaction.find()
    .populate('products.product_id')
    .sort({createdAt:'desc'})
      .then(transactions=>{
        res.status(200).json(transactions)
      })
      .catch(next)
  }
}

module.exports = TransactionController