const { verifyToken } = require('../helpers/jwt')
const UserModel = require('../models/user')
const productModel = require('../models/product')
const cartModel = require('../models/cart')

function authentication(req, res, next){
    try {
        let decodedToken = verifyToken(req.headers.token)
        UserModel.findById(decodedToken.id)
            .then(user => {
                if(user){
                    req.loggedUser = decodedToken
                    next()
                }
                else{
                    next({
                        status: 401,
                        message: 'Authentication Failed'
                    })
                }
            })
            .catch(next)
    }
    catch(err) {
        next({ 
            status: 401,
            message: err 
        })
    }
}

function authorization(req, res, next){    
    productModel.findById(req.params.id)
        .then(product => {
            if(!product){
                next({ status: 404, message: 'Not Found' })
            }
            else if(product.userId == req.loggedUser.id){
                next()
            }
            else{
                next({ 
                    status: 403, 
                    message: 'Not Authorized' 
                })
            }
        })
        .catch(next)
}

function authorizationCart(req, res, next){    
    cartModel.findById(req.params.id)
        .then(cart => {
            if(!cart){
                next({ status: 404, message: 'Not Found' })
            }
            else if(cart.userId == req.loggedUser.id){
                next()
            }
            else{
                next({ 
                    status: 403, 
                    message: 'Not Authorized' 
                })
            }
        })
        .catch(next)
}


module.exports = {authentication, authorization, authorizationCart} 