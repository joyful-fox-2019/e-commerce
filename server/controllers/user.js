const User = require('../models/user')
const { generateToken } = require('../helpers/jwt')
const { compare } = require('../helpers/bcrypt')

class UserController {
  static register(req, res, next) {
    
    User.create({
      username : req.body.username,
      email : req.body.email,
      password : req.body.password,
      role : req.body.role
    })
      .then(user => {
        console.log(user);
        
        let token = generateToken({
          id : user._id,
          email : user.email
        })
        // if (user.role === `admin`) {
        //   localStorage.setItem('isAdmin')
        // }
        res.status(201).json({message : `register success`, token, user})
      })
      .catch(next)
  }

  static login(req, res, next) {
    
    User.findOne({

      email : req.body.email
    })
      .then(user => {     

        if (!user) {
          throw {status : 400, message : `you are not registered. please register first`}
        } else {
          let password = req.body.password
          let passwordDB = user.password
          let match = compare(password, passwordDB)
          if (match) {
            let token = generateToken({
              id : user._id,
              email : user.email
            })
            // if (user.role === `admin`) {
            //   localStorage.setItem('isAdmin')
            // }
            res.status(200).json({message : `login success`, token, user})
          } else {
            throw { status : 400, message : `username/password wrong`}
          }
        }
      })
      .catch(next)
  }
}

module.exports = UserController