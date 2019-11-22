const Transaction = require('../models/transaction');
const Product = require('../models/product');
const User = require('../models/user');
const { checkout } = require('../controllers/cart');


function updateProduct(data) {
  return new Promise ((resolve, reject) => {
    Product.findById(data.id)
      .then(product => {
        if(Number(product.stock) >= Number(data.count)) {
          product.stock = Number(product.stock) - Number(data.count)
          return Product.findByIdAndUpdate(data.id, {stock: product.stock}, {new: true})
        } else {
          throw {msg: 'out of stock'}
        }
      })
      .then(product => {
        resolve(product);
      })
      .catch(reject)
  })
}
module.exports = {
  updateStatusReceived (req, res, next) {
    Transaction.findByIdAndUpdate(req.params.id, {status: true}, {new: true})
      .then(transaction => {
        res.status(200).json({transaction})
      })
      .catch(next)
  },
  updateStatusConfirm (req, res, next) {
    Transaction.findByIdAndUpdate(req.params.id, {confirm: true}, {new: true})
      .then(transaction => {
        res.status(200).json({transaction})
      })
      .catch(next)
  },
  declineTransaction (req, res, next) {
    Transaction.findByIdAndDelete(req.params.id)
      .then(() => {
        res.status(200).json({msg: 'success decline the transaction'})
      })
      .catch(next)
  },
  getTransaction (req, res, next) {
    Transaction.find().populate('UserId')
      .then(transactions => {
        res.status(200).json({ transaction: transactions })
      })
      .catch(next)
  },
  createTransaction (req, res, next) {
    const Cart = req.CartId;
    let totalPayment = 0
    let tempProductId = []
    Cart.product.forEach((el, i) => {
      tempProductId.push({id: el.id, count: el.count})
      totalPayment += Number(el.price) * Number(el.count)
    })
    let getStoreId = []
    Cart.product.forEach((el, i) => {
      getStoreId.push(el.storeId)
    })
    
    let tempUpdateProduct = []
    setTimeout(() => {
      tempProductId.forEach((el, i) => {
        updateProduct(el)
        .then(data => {
          tempUpdateProduct.push(data)
        })
        .catch(next)
      })
    }, 500);
    
    // prosess membuat transaction
    let tempTrasaction
    let tempCart
    setTimeout(() => {
      if(tempUpdateProduct.length == 0) next({msg: 404, msg: 'no have Cart'})
      else {
        setTimeout(() => {
          Transaction.create({ ProductId: tempUpdateProduct, payment: totalPayment, UserId: req.loggedUser.id, StoreId: getStoreId })
            .then(transaction => {
              tempTrasaction = transaction
              return checkout(req.loggedUser.id)
            })
            .then((cart) => {
              tempCart = cart
              return User.findByIdAndUpdate(req.loggedUser.id, {$push: {History: tempTrasaction._id}})
            })
            .then(user => {
              res.status(201).json({transaction: tempTrasaction, product: tempUpdateProduct, cart: tempCart, user})
            })
            .catch(next)
        }, 6200);
      }
    }, 3500);
  }
}