const jwt = require('jsonwebtoken')

const generateToken = (payload) => {
  // console.log(process.env.JWT_SECRET, "secreeeeeeeet")
  return jwt.sign(payload, process.env.JWT_SECRET)
}

const decodeToken = (token) => {
  // console.log(jwt.verify(token, process.env.JWT_SECRET), "dari jwttttt")
  return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = {
  generateToken,
  decodeToken
}