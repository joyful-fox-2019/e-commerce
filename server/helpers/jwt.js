const jwt = require('jsonwebtoken')

function getToken(payload){
  return jwt.sign(payload,process.env.SECRET_JWT)
}

function verifyToken(token){
  return jwt.verify(token,process.env.SECRET_JWT)
}

module.exports = {getToken,verifyToken}