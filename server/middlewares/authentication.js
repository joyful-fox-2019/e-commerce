const {sign, verify} = require('../helpers/jwt')
const Transaction = require('../models/Transaction')

function authentication(req, res, next){
  const token = req.headers.access_token
  
  try{
    const loggedUser = verify(token)
    req.loggedUser = loggedUser
    next()
  }
  catch(err){
    next({
      msg: 'Login needed',
      status: 401
    })
  }
}

function transactionAuthentication(req, res, next){
  const loggedUser = req.loggedUser
  const _id = req.params.id

  Transaction.findOne({_id})
    .then(transaction=>{
      console.log(transaction.user_id, loggedUser._id)
      if(transaction.user_id == loggedUser._id){
        next()
      }
      else {
        next({
          msg: 'Not authorized',
          status: 403
        })
      }
    })
    .catch(next)
}

function adminAuthorization(req, res, next){
  const loggedUser = req.loggedUser
  if(loggedUser.admin){
    next()
  }
  else{
    next({
      msg: 'Not Authorized',
      status: 403
    })
  }
}

module.exports = {
  authentication,
  adminAuthorization,
  transactionAuthentication
}