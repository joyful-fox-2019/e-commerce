const { decodeToken } = require('../helpers/jwt')

function authentication (req,res,next) {
  if(req.headers.access_token){
    req.loggedUser = decodeToken(req.headers.access_token)
    next()
  }
  else{
    res.status(401).json({ message: 'Invalid authentication' })
  }
}

function authorization (req,res,next) {
  if(req.loggedUser.role === 'admin'){
    next()
  }
  else{
    res.status(401).json({ message: 'Invalid authorization' })
  }
}

module.exports = {
  authentication,
  authorization
}