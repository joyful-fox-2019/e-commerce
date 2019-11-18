const User = require('../models/user')
const { hashPass, checkPass } = require('../helpers/hash')
const jwt = require('../helpers/jwt')
const Product = require('../models/product')

class UserController {

    static readAll (req,res,next) {
        User.find({}).populate('shop')
            .then(function (users) {
                res.status(200).json(users)
            })
            .catch(next)
    };

    static readMe (req,res,next) {
        
        User.findOne({_id: req.decoded.id}).populate('shop')
            .then(function (user) {
                console.log(user)
                res.status(200).json(user)
            })
            .catch(next)
    }   

    static create(req,res,next) {
      
        User.create({
            username:req.body.username,
            password: req.body.password,
            email:req.body.email
        })
        .then(function (user) {
            res.status(201).json({user, message: `Hallo ${user.username}, Thank You For Registering`})
        })
        .catch(next)
    }

    static login (req,res,next) {
        
        let username = req.body.username
        let password = req.body.password
        User.findOne({
            username: username
        })
        .then(function(user) {
            if (user) {
                if (checkPass(password, user.password)) {
                    let payload = {
                        id: user.id,
                        username: user.username
                    }
                    let token = jwt.generateToken(payload)
                    
                    res.status(202).json({token, message: `Welcome ${user.username}, we hope you enjoy our app!`})
                }else {
                    next({status: 404, message: 'Invalid Username / Password !!'})
                }
            }else {
                next({status: 404, message: 'Invalid Username / Password !!'})
            }
        })
        .catch(next)
    };

    static updateTopUp (req,res,next) {
        let userId = req.decoded.id
        let totalTopUp = req.body.topup
        User.findOne({_id: userId})
            .then(function (user) {
                let totalBalance = Number(user.balanced) + Number (totalTopUp)
                return User.updateOne({_id: userId}, {balanced: totalBalance},{new: true})
                    .then(function (user) {
                        res.status(202).json({totalBalance, message: `Thank You for your TopUp, Your balance now Rp. ${totalBalance}`})
                    })
            })
            .catch(next)
    };


    


    



};


module.exports = UserController