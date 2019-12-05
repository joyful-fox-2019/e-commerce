const User = require('../models/user')
const {comparePassword} = require('../helpers/bcryptjs')
const {generateToken} = require('../helpers/jwt')

class UserController {
    static register (req,res,next) {
      const {username,password,email,role} = req.body
      User.create({username,password,email,role})
          .then(result => {
              let payload = {email:result.email, _id:result._id, role:result.role}
              let token = generateToken(payload)
              res.status(201).json({token, username:result.username, email:result.email, role:result.role, cart:result.cart})
          })
          .catch(next)
    }

    static login (req,res,next) {
        const {email,password} = req.body
        User.findOne({email})
        .then(user=>{
            if(user) {
              if(comparePassword(password,user.password)){
                let payload = {email:user.email, _id:user._id, role:user.role}
                let token = generateToken(payload)
                res.status(200).json({token, username:user.username, email:user.email, role:user.role, cart:user.cart})
              }
              else{
                next({ status:400, message:'Wrong Password' })
              }
            } else {
              next({ status:404, message:'Email Not Found' })
            }
        })
        .catch(next)
    }
}

module.exports = UserController