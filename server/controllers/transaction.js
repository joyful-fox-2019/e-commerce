const Transaction = require('../models/transaction')
const Cart = require('../models/cart')
const Product = require('../models/product')

class TransactionConroller {
  static checkout(req, res, next) {
    let owner = req.logedUser.id
    let userCarts = []
    let dataProduct = []
    let product = []
    let totalPrice = null

    Cart.find({ idUser: owner, status: false })
      .then(carts => {
        userCarts = carts
        carts.forEach(el => {
          dataProduct.push(
            Product.findById(el.idProduct)
          )
        })
        return Promise.all(dataProduct)
      })
      .then(data => {
        product = data
        data.forEach((el, i) => {
          let dataUpdate = el.stock - userCarts[i].qty
          totalPrice += (el.price * userCarts[i].qty)
          dataProduct.push(
            Product.findByIdAndUpdate(el._id, { $set: { stock: dataUpdate } })
          )
        })
        return Promise.all(dataProduct)
      })
      .then(_ => {
        return Cart.updateMany({ idUser: owner }, {$set: {status: true}})
      })
      .then(_ => {
        return Transaction.create({
          owner, products: product,carts: userCarts, totalPrice
        })
      })
      .then(transaction => {
        
        res.status(201).json(transaction)
      })
      .catch(next)
  }

  static getTransaction(req, res, next) {
    let owner = req.logedUser.id
    Transaction.find({ owner })
      .populate('products')
      .populate("owner")
      .populate('carts')
      .then(transaction => {
        res.status(200).json(transaction)
      })
      .catch(next)
  }

  static getTransactionAdm(req, res, next) {
    Transaction.find()
      .populate('products')
      .populate("owner")
      .populate('carts')
      .then(transactions => {
        res.status(200).json(transactions)
      })
      .catch(next)
  }

  static updateStatus(req, res, next) {
    let idTransaction = req.params.id
    let { status } = req.body
    Transaction.findByIdAndUpdate(idTransaction, { $set: { status: status } }, {new: true})
      .then(transaction => {
        res.status(200).json(transaction)
      })
      .catch(next)
  }

  static deleteTransaction(req, res, next) {
    let id = req.params.id
    Transaction.deleteOne({ _id: id })
      .then(transaction => {
        res.status(200).json(transaction)
      })
      .catch(next)
  }
}

module.exports = TransactionConroller