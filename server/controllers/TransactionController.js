const Transaction = require('../models/transaction')
const Product = require('../models/product')

class TransactionController {
  static read(req, res, next){
    Transaction.find({userId:req.loggedUser._id})
      .populate('userId')
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static readAdmin(req, res, next){
    Transaction.find()
      .populate('userId')
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static create(req, res, next){
    let { productList } = req.body
    let totalPrice = 0
    let productIdList = []
    let updateProduct = []
    productList.forEach(product => {
      if(product.qty > product.productId.stock){
        throw ({ status: 400, message: "Out of Stock"})
      }
      else{
        totalPrice += product.qty * product.productId.price
        productIdList.push(product.productId._id)
        updateProduct.push({
          updateOne : {
            filter: { _id: product.productId._id },
            update: { stock: product.productId.stock - product.qty}
          }
        })
      }
    })
    Product.bulkWrite(updateProduct)
      .then(() => {
        return Transaction.create({
          userId: req.loggedUser._id,
          productList,
          totalPrice
        })
      })
      .then(data => {
        res.status(201).json(data)
      })
      .catch(next)
  }

  static updateStatus(req, res, next){
    let { status } = req.body
    Transaction.findByIdAndUpdate({_id:req.params.id}, {status})
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }
}

module.exports = TransactionController
