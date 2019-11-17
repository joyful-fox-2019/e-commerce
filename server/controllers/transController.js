const Transaction = require('../models/TransactionModel')
const Product = require('../models/ProductModel')
const User = require('../models/UserModel')

class TransactionController{

  static async create(req,res,next){
    try {
      let _id = req.loggedUser._id
      let {cartPrice} = req.body
      const user = await User.findOne({_id})
      let transactionData = []
      for (let productInCart of user.cart) {
        const product = await Product.findOne({_id:productInCart.product})
        const updated = await Product.updateOne({_id : product._id},{$set:{stock : (product.stock-productInCart.qty)}})
        let obj = {}
        obj.product = product._id
        obj.qty = productInCart.qty
        transactionData.push(obj)
      }
      const createTransaction = await Transaction.create({
        userId : _id,
        cart : transactionData
      })
      let update = await User.updateOne({_id},{ "$set" : {cart:[],money: (user.money - Number(cartPrice))}})
      let admin = await User.updateOne({admin : true},{$inc : {money : cartPrice}})
      let report = {
        message : 'Checkout done!',
      }
      res.status(200).json({report,update})
    } catch (error) {
      console.log(error);
      next(error)
    }
  }



  static async user(req,res,next){
    try {
      let userId = req.loggedUser._id
      let transactions = await Transaction.find({userId}).populate('cart.product').sort({createdAt: 'desc'})
      res.status(200).json(transactions)
    } catch (error) {
      next(error)
    }
  }

  static async all(req,res,next){
    try {
      const transactions = await Transaction.find({}).populate('cart.product')
      res.status(200).json({transactions})
    } catch (error) {
      next(error)
    }
  }

  static async update(req,res,next){
    try {
      let {transactionId} = req.params
      let {status} = req.body
      const updated = await Transaction.updateOne({_id:transactionId},{status})
      res.status(200).json(updated)
    } catch (error) {
      next(error)
    }
  }

  static async remove(req,res,next){
    try {
      let {transactionId} = req.params
      const deleteTrans = await Transaction.deleteOne({_id:transactionId})
      let message = 'Transaction deleted!'
      res.status(200).json({message, deleteTrans})
    } catch (error) {
      next(error)
    }
  }

}

module.exports = TransactionController