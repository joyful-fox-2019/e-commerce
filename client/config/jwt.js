const jwt = require('jsonwebtoken')

function verifyToken (token) {
  return jwt.verify(token, process.env.VUE_APP_SECRET_JWT)
}

module.exports = verifyToken
