const jwt = require('jsonwebtoken')

const generateToken = (payload) => {
  console.log(process.env.JWT_SECRET);
  
  return jwt.sign(payload, process.env.JWT_SECRET)
}

const decodeToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = {
  generateToken,
  decodeToken
}