const User = require('../models/User')
const { decodeToken } = require('../helpers/jwt')
const Product = require('../models/Product')

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
  }
}