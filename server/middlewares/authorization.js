const Cart = require('../models/cart')
const User = require('../models/user')
const Transactions = require('../models/transactions')
const { verifyToken } = require('../helpers/jwt')

const admin = (req, res, next) => {
  const decode = verifyToken(req.headers.accesstoken)
  User.findById(decode.id)
    .then( data => {
      if (data.role == 'admin'){
        req.user = decode
        next()
      } else {
        next({
          status: 400,
          message: 'Dont Have Authorization!'
        })
      }
    })
}

const authorization = (req, res, next) => {
  const _id = req.params.id
  Cart.findOne ({ _id, owner: req.user.id })
    .then(data => {
      if (data) {
        next ()
      } else {
        next({
          status: 400,
          message: `Not Your Account`
        })
      }
    })
    .catch(next)
}

const authorizationTransactions = (req, res, next) => {
  const _id = req.params.id
  Transactions.findOne ({ _id, owner: req.user.id })
    .then(data => {
      if (data) {
        next ()
      } else {
        next({
          status: 400,
          message: `Not Your Account`
        })
      }
    })
    .catch(next)
}

module.exports = { 
  authorization,
  admin,
  authorizationTransactions
} 