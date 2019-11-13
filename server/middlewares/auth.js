const {verifyToken} = require('../helpers/jwt')
const User = require('../models/User')
const Cart = require('../models/Cart')


function authentication(req, res, next){
    try {
        let decodedToken = verifyToken(req.headers.token)
        req.loggedUser = decodedToken
        next()
    }
    catch(err) {
        next(err)
    }
}

function adminAuthorization (req, res, next) {
    try {
        if(req.loggedUser.role !=='admin') {
            throw {status: 401, msg: 'This page is for admin only'}
        } else {
            next()
        }
    }
    catch(err) {
        next(err)
    }
}

function cartAuthorization (req ,res, next) {
    let {id} = req.params
    Cart.findById({_id:id})
    .then(cart => {
        try {
            if(!cart) {
                throw {status:404,message:'Data not found'}
            } else {
                if(String(cart.userId) !== String(req.loggedUser._id)) {
                    throw {status:401, message:'you are not authorized'}
                } else {
                    next()
                }
            }
        }
        catch (err) {
            next(err)
        }
    })
}

module.exports = {authentication, adminAuthorization, cartAuthorization} 