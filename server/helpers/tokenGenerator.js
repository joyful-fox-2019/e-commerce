const jwt = require('jsonwebtoken')

function generateToken(payloads){
   return jwt.sign(payloads,process.env.JWT_SECRET)
}

function verifyToken(str){
    return jwt.verify(str,process.env.JWT_SECRET)
}


module.exports = {
    generateToken,
    verifyToken
}