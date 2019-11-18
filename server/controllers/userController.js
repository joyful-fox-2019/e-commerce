const User = require('../models/User')
const {compare} = require('../helpers/bcrypt')
const {sign} = require('../helpers/jwt')

class UserController {
  static register(req, res, next){
    const {username, email, password} = req.body
    User.create({
      username,
      email,
      password
    })
      .then(users=>{
        res.status(201).json(users)
      })
      .catch(next)
  }

  static login(req, res, next){
    const {email, password} = req.body
    console.log(email)
    User.findOne({email})
      .then(user=>{
        if(user && compare(password, user.password)){
          const obj = {
            _id : user._id,
            email : user.email,
            admin: user.admin
          }
          const token = sign(obj)

          res.status(200).json({
            _id: user._id,
            admin: user.admin,
            token
          })
        } else {
          throw {
            msg: 'Wrong email/password',
            status: 400
          }
        }
      })
      .catch(next)
  }

  static getUser(req, res, next){
    const loggedUser = req.loggedUser
    User.findOne({_id: loggedUser._id})
    .populate('cart.product_id')
      .then(user=>{
        res.status(200).json(user)
      })
      .catch(next)
  }

  static addCart(req, res, next){
    const {product_id, amount} = req.body
    const loggedUser = req.loggedUser
    let userAmount
    let isDuplicate = false
    User.findOne({
      _id: loggedUser._id
    })
    .populate('cart.product_id')    
      .then(user=>{
        user.cart.forEach(product=>{
          if(product.product_id._id == product_id){
            userAmount = product.amount
            isDuplicate = true
          }
        })

        if(isDuplicate){
          const amountAgg = Number(userAmount) + Number(amount)
          User.updateOne({_id: loggedUser._id, 'cart.product_id': product_id },  {
            $set: {'cart.$.amount': amountAgg}
          })
            .then(num=>{
              res.status(201).json(num)
            })
            .catch(next)
        }
        else{
          const obj = {
            product_id,
            amount
          }
          User.updateOne({_id: loggedUser._id}, {
            $push: { 
              cart: obj
            }
          })
            .then(num=>{
              res.status(200).json(num)
            })
            .catch(next)
        }
      })
  }

  static subtractCart(req, res, next){
    const {product_id} = req.body
    const loggedUser = req.loggedUser
    let isThere = false
    let amount = -1
    User.findOne({_id: loggedUser._id})
      .then(user=>{
        user.cart.forEach(product=>{
          if(product.product_id._id == product_id){
            amount = Number(product.amount) - 1
            isThere = true
          }
        })

        if(isThere && amount > 0){
          return User.updateOne({_id: loggedUser._id, 'cart.product_id': product_id}, {
            $set: {'cart.$.amount': amount}
          })
        }
        else{
          if(amount == 0){
            return User.updateOne({_id: loggedUser}, {
              $pull: {cart: {product_id}}
            })
          }
          else{
            next({
              msg: `Product is not in your cart`,
              status: 400
            })
          }
        }
      })
      .then(num=>{
        res.status(200).json(num)
      })
      .catch(next)
  }

  static removeCart(req, res, next){
    const loggedUser = req.loggedUser
    const {product_id} = req.body
    User.updateOne({_id: loggedUser._id}, {
      $pull: {cart: {product_id}}
    })
      .then(num=>{
        res.status(201).json(num)
      })
      .catch(next)
  }
}

module.exports = UserController