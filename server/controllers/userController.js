const User = require('../models/user')
const hashPassword = require('../helpers/passwordGenerator').hashPassword
const verifyPassword = require('../helpers/passwordGenerator').verifyPassword
const tokenGenerator = require('../helpers/tokenGenerator').generateToken
const Product = require('../models/product')

class UserController {
    static register(req,res,next){
        let password = hashPassword(req.body.password)
        User.create({
            fullname : req.body.fullname,
            email : req.body.email,
            password : password,
            role : req.body.role
        })
        .then( user => {
            console.log(user,'dari user controller')
            res.status(201).json(user)
            // console.log(user)
        })
        .catch(err => {
            next({
                status : 500,
                message: err
            })
        })
    }

    static signIn(req,res,next){
        User.findOne({
            email : req.body.email
        })
        .then(user => {
            if(user){
                if(verifyPassword(req.body.password, user.password)){
                    let payloads = {
                        id : user._id,
                        email : user.email,
                        role : user.role
                    }
                    let token = tokenGenerator(payloads)
                    res.status(200).json(token)
                }else{
                    res.status(500).json({
                        status : 500,
                        message : "wrong email/password"
                    })
                }
            }else{
                res.status(500).json({
                    status : 500,
                    message : "wrong email/password"
                })
            }
        })
        .catch(err =>{
            console.log(err)
          next({
              status : 500,
              message : "wrong email/password"
          })
        })
    }
}

module.exports = UserController