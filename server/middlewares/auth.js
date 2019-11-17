const {verifyToken} = require('../helpers/jwt')
const User = require('../models/UserModel')
const Transaction = require('../models/TransactionModel')

function authentication(req,res,next){
  try {
    let {token} = req.headers
    let decoded = verifyToken(token)
    req.loggedUser =  decoded
    next()
  } catch (error) {
    next(error)
  }
}

function authorization(req,res,next){
  let userId = req.loggedUser._id
  User.findOne({_id : userId})
    .then((user)=>{
      if(user.admin){
        next()
      } else {
        next({status : 401, message: 'You are not authorize to perform this action'})
      }
    })
    .catch((error)=>{
      next(error)
    })
}

async function authorizationTrans(req,res,next){
  try {
    let userId = req.loggedUser._id
    let {transactionId} = req.params
    console.log(transactionId)
    let isAdmin = await User.findOne({_id:userId})
    console.log(isAdmin)
    if(isAdmin.admin){
      next()
    } else {
      let findTransaction = await Transaction.findOne({_id:transactionId})
      console.log(findTransaction)
      if (findTransaction.userId == userId){
        next()
      } else {
        next({status : 401, message: 'You are not authorize to perform this action'})
      }
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
}

module.exports = {authentication,authorization,authorizationTrans}