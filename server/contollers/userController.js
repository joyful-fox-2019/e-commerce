const User = require('../models/user')
const {comparePassword} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')

class userController {
    
    static findOne(req, res, next) {
        let {username, email, photo, membership, _id} = req.user
        res.json({
            msg : 'user found',
            user : {
                username,
                email,
                photo,
                membership,
                _id
            }                        
        })
    } 
    static register(req, res, next) {
        const {email, username, password, photo, role} = req.body
        User.
            create({
                email,
                username,
                password,
                photo,
                role,
            })
            .then(user => {
                res.status(201).json({
                    msg : `user created`
                })
            })
            .catch(next)
    }
    static login(req, res, next) {
        User.findOne({ 
            email : req.body.email
        })
        .then(user => {            
            if (user) { 
                let valid = comparePassword(req.body.password, user.password) 
                if ( valid ) {               
                    let token = generateToken(user)  
                    let {username, email, photo, membership, _id} = user
                    res.json({
                        msg : 'login succes',
                        token : token,
                        user : {
                            username,
                            email,
                            photo,
                            membership,
                            _id
                        }                        
                    })
                } else {                    
                    next({
                        status: 403,
                        msg: 'Wrong Password'
                    })
                }
            } else {
                next({
                    status : 404,
                    msg : 'user not found'
                })
            } 
        })
        .catch(err => {
            next(err)
        })
    }

    static loginGoogle(req, res, next) { 
        let { email, name, picture } = req.decoded
        User.findOne({
            email : email
        })
        .then( user => {
            let password = email+'tes'
            if (!user) {
                return User.create({
                    email, 
                    password,
                    username : name,
                    photo : picture})
            } else {
                return user
            }
        })
        .then(user => {      
            let {username, email, photo, membership, _id} = user      
            let token = generateToken(user)  
            res.json({
                status : 200,
                msg : 'login success',
                token : token,
                user : {
                    username,
                    email,
                    photo,
                    membership,
                    _id
                }  
            })                     
        })
        .catch( err => {
            console.log(err)
        }) 
                   
    }

    static loginFacebook(req, res, send) {
        req.decoded = JSON.parse(req.body.user)
        let { email, name, picture } = req.decoded
        User.findOne({
            email : email
        })
        .then( user => {
            let password = email+'tes'
            if (!user) {
                return User.create({email, password, username : name, photo : picture.url})
            } else {
                return user
            }
        })
        .then(user => {            
            let token = generateToken(user)  
            let {username, email, photo, membership} = user      
            res.json({
                status : 200,
                msg : 'you are login',
                token : token,
                user : {
                    username,
                    email,
                    photo,
                    membership
                }  
            })                     
        })
        .catch( err => {
            console.log(err)
        }) 
    }
}

module.exports = userController