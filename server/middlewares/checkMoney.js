const User = require('../models/UserModel')

async function cekMoney (req,res,next){
  let userId = req.loggedUser._id
  let {cartPrice} = req.body
  let user = await User.findOne({_id:userId})
  if (cartPrice > user.money){
    next({status: 400, message: 'You dont have enough money to checkout, consider to remove something'})
  } else {
    next()
  }

}

module.exports = cekMoney