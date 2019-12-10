const { verifyedToken } = require('../helpers/jwt')
const User = require('../models/user')
const Cart = require('../models/cart')
const Transaction = require('../models/transaction')

function authentication(req, res, next) {
  try {
    let decodeToken = verifyedToken(req.headers.token)
    req.logedUser = decodeToken
    next()
  }
  catch{
    next({ status: 400, msg: 'You are not authentication!' });
  }

}

function adminAuth(req, res, next) {
  let { id } = req.logedUser
  User.findById(id)
    .then(user => {
      if (user.role == 'admin') {
        next()
      } else {
        next({ status: 400, msg: 'You are not Authorized!' })
      }
    })
    .catch(next)
}

function custAuth(req, res, next) {
  let { id } = req.logedUser
  User.findOne({ _id: id })
    .then(user => {
      if (user.role == 'customer') {
        next()
      } else {
        res.status(400).json('You are not Authorized!')
      }
    })
    .catch(next)
}

function cartAuth(req, res, next) {
  let { id } = req.logedUser
  let { idCart } = req.params
  Cart.findById(idCart)
    .then(cart => {
      if (cart.idUser == id) {
        next()
      } else {
        res.status(400).json('You are not Authorized!')
      }
    })
    .catch(next)
}

function transactionAuth(req, res, next) {
  let { id } = req.logedUser
  let idTransaction = req.params.id
  Transaction.findById(idTransaction)
    .then(transaction => {
      if (transaction.owner == id) {
        next()
      } else {
        res.status(400).json('You are not Authorized!')
      }
    })
    .catch(next)
}

module.exports = { authentication, adminAuth, custAuth, cartAuth, transactionAuth }