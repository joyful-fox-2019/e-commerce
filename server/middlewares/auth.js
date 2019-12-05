const User = require('../models/User')
const { decodeToken } = require('../helpers/jwt')
const Cart = require('../models/Cart')

module.exports = {
  authentication: (req, res, next) => {
    User.findById(decodeToken(req.headers.access_token)._id)
      .then(user => {
        if(!user) {
          throw { status: 401, msg: 'You have to login first'}
        } else {
          req.loggedUser = user
          next()
        }
      })
      .catch(next)
  },
  adminAuthorization: (req, res, next) => {
    try {
      if(!req.loggedUser.isAdmin) {
        throw { status: 403, msg: 'You are not authorized to access this data'}
      } else {
        next()
      }
    } catch (err) {
      next(err)
    }
  },
  customerAuthorization: (req, res, next) => {
    try {
      if(req.loggedUser.isAdmin) {
        throw { status: 403, msg: 'You are not authorized to access this data'}
      } else {
        next()
      }
    } catch (err) {
      next(err)
    }
  },
  cartAuthorization: (req, res, next) => {
    Cart.findById(req.params.id)
      .then(cart => {
        if(!cart) {
          throw { status: 404, msg: 'Data not found'}
        } else {
          if(String(cart.customer) !== String(req.loggedUser._id)) {
            throw { status: 403, msg: 'You are not authorized to access this data' }
          } else {
            next()
          }
        }
      })
      .catch(next)
  }
}