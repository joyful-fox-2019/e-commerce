const Transactions = require('../models/transactions')
const Cart = require('../models/cart')
const Product = require('../models/product')

class TransactionsController {

  static addTransactions(req, res, next){
    const owner = req.user.id
    let dataCart
    let dataProduct = []
    let promises = []
    Cart.find({ owner })
      .then( data => {
        dataCart = data
        data.forEach(l => {
          promises.push(
            Product.findById(l.product)
          )
        })
        return Promise.all(promises)
      })
      .then(result => {
        result.forEach((el,i) => {
          let updated = el.stock - dataCart[i].quantity
          dataProduct.push(el._id)
          promises.push(
            Product.findByIdAndUpdate(
              el._id, { 
              $set: { stock: updated }
            })
            )
          })
        return Promise.all(promises)
        })
      .then(_=>{
        return Cart.deleteMany({ owner })
      })
      .then(() => {
        return Transactions.create({ products: dataProduct, owner })
      })
      .then(data => {
        res.status(201).json(data)
      })
      .catch(next)
  }

  static findAll(req, res, next){
    const owner = req.user.id
    Transactions.find({ owner })
      .populate(['products', 'owner'])
      .then( data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static findPending(req, res, next){
    Transactions.find({ status: 'pending'})
      .populate(['products', 'owner'])
      .populate('products')
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static findApprove(req, res, next){
    Transactions.find({ status: 'approved'})
      .populate(['products', 'owner'])
      .populate('products')
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static setApprove(req, res, next){
    const { id } = req.params
    Transactions.findByIdAndUpdate(id, {$set: { status: 'approved' }})
      .then(result => {
        res.status(200).json({ message: 'Status Set To Approved'})
      })
      .catch(next)
  }

  static setDelivered(req, res, next){
    const { id } = req.params
    Transactions.findByIdAndUpdate(id, {$set: { status: 'delivered' }})
      .then(result => {
        res.status(200).json({ message: 'Status Set To Delivered'})
      })
      .catch(next)
  }
}

module.exports = TransactionsController