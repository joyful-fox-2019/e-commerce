const {verifyToken} = require('../helpers/jwt')
const User = require('../models/user')
const Cart = require('../models/cart')

function authentication(req, res, next){
    try{
        req.loggedUser = verifyToken(req.headers.token)
        next()
    }catch(err){
        next({
            status : 401,
            message : 'Not Login'
        })
    }
}

function authorization(req, res, next){
    let productId = req.params.id
    User.findOne({ProductsId : productId})
    .then(data=>{
        if(data._id == req.loggedUser.id){
            next()
        }else{
            next({
                status : 403,
                message : 'Not Authorized'
            })
        }
    })
    .catch(next)
}

function roleCheck(req, res, next){
    User.findOne({_id : req.loggedUser.id})
    .then(data=>{
        if(data.role === 'seller'){
            next()
        }else{
            next({
                status : 403,
                message : 'Not a Seller'
            })
        }
    })
    .catch(next)
}

// function cartAuthorization(req,res,next){
//     let cartId = req.params.id
//     Cart.findOne({_id : cartId})
//     .then(data=>{
//         if(data.UserId == req.loggedUser.id){
//             next()
//         }else{
//             next({
//                 status : 403,
//                 message : 'Not Authorized'
//             })
//         }
//     })
//     .catch(next)
// }



module.exports = {authentication, authorization, roleCheck}