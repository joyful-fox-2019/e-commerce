const { verifyToken } = require('../helpers/jwt')
const Product = require('../models/product')
const Transaction = require('../models/transaction')

module.exports= {
  authenticate (req, res, next) {
    try {
      const decode = verifyToken(req.headers.token)
      req.loggedUser = decode
      next()
    }
    catch (err) {
      next(err)
    }
  },
  isAdmin (req, res, next) {
    if(req.loggedUser.role === 'admin') next()
    else next({ status: 403, message: {message: 'Authorization failed' }})
  },
  trxAuthorization (req ,res, next) {
    const { id } = req.params
    if(req.loggedUser.role === 'admin'){
      next()
    } else {
      Transaction.findById(id)
        .then(transaction => {
          if(transaction && transaction.owner.toString() === req.loggedUser.id){
            next()
          } else {
            next({status: 403, message: { message: 'Authorization failed'}})
          }
        })
        .catch(next)
    }
  }
}