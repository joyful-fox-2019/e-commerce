const {verifyToken} = require('../helpers/jwt')
const User = require('../models/user')
const Cart = require('../models/cart')
const Transaction = require('../models/transaction')

function authentication(req, res, next){
    try {
        let decodedToken = verifyToken(req.headers.token)
        User.findById(decodedToken._id)
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

function authorizationAdmin(req, res, next){
    
    if(req.loggedUser.role === "admin"){
        next()
    }
    else{
        next({ 
            status: 403, 
            message: 'Not Authorized' 
        })
    }
}

function authorizationCart(req, res, next){
    Cart.findById(req.params.id)
    .then(cart => {
            if(!cart){
                next({ status: 404, message: 'Not Found' })
            }
            else if(cart.userId == req.loggedUser._id){
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

function authorizationTransaction(req, res, next){
    Transaction.findById(req.params.id)
    .then(transaction => {
            if(!transaction){
                next({ status: 404, message: 'Not Found' })
            }
            else if(transaction.userId == req.loggedUser._id || req.loggedUser.role == "admin"){
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

module.exports = {authentication, authorizationAdmin, authorizationCart, authorizationTransaction} 
