const { decodeToken } = require('../helpers/jwt')
const { user, product, cart } = require('../models')

module.exports = {
  authentication: function (req, res, next) {
    try {
      req.loggedUser = decodeToken(req.headers.token)
      user
        .findOne({
          _id: req.loggedUser._id
        })
        .then(result => {
          if (!result) {
            next({
              status: 401,
              message: 'Unauthorized'
            })
          } else {
            next()
          }
        })
        .catch(next)
    } catch (error) {
      next(error)
    }
  },
  adminAuthorization: function (req, res, next) {
    user
      .findById(req.loggedUser._id)
      .then(result => {
        if (result.isAdmin) {
          next()
        } else {
          next({
            status: 403,
            message: 'not authorized'
          })
        }
      })
      .catch(next)
  },
  cartAuthorization: function (req, res, next) {
    cart
      .findById(req.params.id)
      .then(result => {
        if (result.UserId = req.loggedUser._id) {
          next()
        } else {
          next({
            status: 403,
            message: 'not authorized'
          })
        }
      })
      .catch(next)
  }
}
