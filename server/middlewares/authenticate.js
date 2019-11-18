const User = require('../models/user')
const jwt = require('../helpers/jwt')

module.exports = (req, res, next) => {
  try {
    req.payload = jwt.verify(req.headers.access_token)
    User.findOne({ _id: req.payload.id })
      .then(result => {
        if (result) {
          next()
        } else {
          let err = new Error('User is not found')
          next(err)
        }
      })
      .catch(err => {
        next(err)
      })
  } catch (err) {
    err.name = 'JsonWebTokenError'
    next(err)
  }
}