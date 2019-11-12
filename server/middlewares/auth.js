const { verifyToken } = require('../helpers/jwt')
const { User, Item, Cart } = require('../models/index')

function authentication (req, res, next){
  // console.log('masuk authentication')
  try {
    let decodedToken = verifyToken(req.headers.token)
    User.findById(decodedToken.id)
      .then(user => {
        if(user){
          req.loggedUser = decodedToken
          next()
        } else{
          next({ status: 401, message: 'authentication failed' })
        }
      })
      .catch(next)
  }
  catch(err) {
    next({ status: 401, message: err })
  }
}

function authCustomer(req, res, next) {
  try {
    if (req.loggedUser.role == 'customer') {
      next()
    } else {
      next({ status: 401, message: 'restricted customer only' })
    }
  }
  catch(err) {
    next({ status: 401, message: err })
  }
}

function authAdmin(req, res, next) {
  try {
    if (req.loggedUser.role == 'admin') {
      next()
    } else {
      next({ status: 401, message: 'restricted admin only' })
    }
  }
  catch(err) {
    next({ status: 401, message: err })
  }
}

function authorization (req, res, next){
    // console.log('masuk authorization')
  let { id } = req.params //id cart
  Cart.findById(id)
    .then(cart => {
      if(!cart){
        next({ status: 404, message: 'not found' })
      } else if(cart.userId == req.loggedUser.id){
        next()
      } else{
        next({ status: 403, message: 'Not Authorize' })
      }
    })
    .catch(err => {
      next({ status: 403, message: err })
    })
}

module.exports = { authentication, authCustomer, authAdmin, authorization}