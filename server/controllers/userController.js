const User = require('../models/user')
const { decodeHash } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController {

  static async login (req, res, next) {
    const { email,password } = req.body
    try{
      const data = await User.findOne({ email })
      if(data){
        if(decodeHash(password,data.password)){
          let payload = { email:data.email,name:data.name,_id:data._id,role:data.role }
          let token = generateToken(payload)
          res.status(200).json({ access_token: token, message:'Login successfuly!', name: data.name, role:data.role })
        }
        else{
          throw { message: 'Invalid email/password',status:400 }
        }
      }
      else{
        throw { message: 'Invalid email/password',status:400 }
      }
    }
    catch(err){
    next(err)
    }
  }

  static async signup (req, res, next) {
    const { email,password,name } = req.body
    try{
      const data = await User.create({ email,password,name })
      res.status(201).json({ message:'Success sign up' })
    }
    catch(err){
      next(err)
    }
  }

}

module.exports = UserController