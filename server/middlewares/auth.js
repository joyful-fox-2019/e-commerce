const User = require('../models/User')
const { decodeToken } = require('../helpers/jwt')

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
  }
}