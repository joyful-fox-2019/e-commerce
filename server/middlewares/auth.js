const User = require('../models/user');
const Store = require('../models/Store');
const Transaction = require('../models/transaction');
const { decodeToken } = require('../helpers/jwt');
const Cart = require('../models/cart');

module.exports = {
  authentication (req, res, next) {
    try {
      if(req.headers.token) {
        const decode = decodeToken(req.headers.token);
        User.findOne({ email: decode.email })
          .then(user => {
            if(user) {
              req.loggedUser = decode;
              next()
            } else {
              next({ status: 400, msg: 'bad request' })
            }
          })
      } else {
        next({ status: 403, msg: 'Authentication Error' })
      }
    }
    catch(err) {
      next(err)
    }
  },
  confirmTransaction (req, res, next) {
    try {
      Transaction.findById(req.params.id)
        .then(transaction => {
          if(transaction.UserId == req.loggedUser.id) {
            next()
          } else {
            next({status: 400, msg: 'dont have access'})
          }
        })
        .catch(next)
    }
    catch(err){
      next(err)
    }
  },
  updateStatusTransaction (req, res, next) {
    try{
      console.log(req.params.id)
      Transaction.findById(req.params.id)
        .then(transaction => {
          if(transaction.confirm) {
            next()
          } else {
            next({ status: 403, msg: 'Wait till the Admin confirm this transaction'})
          }
        })
        .catch(next)
    }
    catch(err){
      next(err)
    }
  },
  authorCrudProduct (req, res, next) {
    try {
      Store.findOne({Owner: req.loggedUser.id})
        .then(store => {
          let pass = false;
          store.ProductId.forEach((el, i) => {
            if(el == req.params.id) {
              pass = true;
            }
          })
          if(!pass) next({status: 404, msg: 'Product Not Found/Authorization Error'})
          else {
            next()
          }
        })
        .catch(next)
    }
    catch(err){
      next(err)
    }
  },
  transaction (req, res, next) {
    try {
      Cart.findOne({ UserId: req.loggedUser.id }).populate('UserId')
        .then(cart => {
          req.CartId = cart
          next()
        })
        .catch(next)
    }
    catch(err){
      next(err)
    }
  }
}