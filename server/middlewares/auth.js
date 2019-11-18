const bcryptjs = require("../helpers/bcryptjs.js");
const User = require("../models/user.js");
const Cart = require("../models/cart.js");

module.exports = {
    authentication : function(req, res, next){
        try {
            let user = bcryptjs.decodeToken(req.headers.authorization)
            User.findOne({_id:user._id})
            .then(result=>{
                if(result){
                    req.body.user = result;
                    req.params.user = result;                    
                    next()
                }else{
                    throw new Error("User not found")
                }
            })
        } catch(err) {
            next(err)
        }
       
    },
    authorization : function(req,res,next){  
        let loginUser = req.body.user || req.params.user || null

    },
    adminOnly: function(req,res,next){
        let loginUser = req.body.user || req.params.user || null

        if(loginUser && loginUser.role === "admin"){
            next()
        }else{
            next(new Error("Not Authorized"))
        }

    },
    customerOnly: function(req,res,next){
        let loginUser = req.body.user || req.params.user || null
       
        if(loginUser && loginUser.role === "customer"){
            next()
        }else{
            next(new Error("Not Authorized"))
        }
        
    },
    cartAuth: function(req, res, next){
        let loginUser = req.body.user ? req.params.user:null

        Cart.findOne({_id:req.params.cartId})
            .then(( result ) => {
                if(result){
                    result.userId == loginUser._id ? next():next(new Error("Not Authorized"))
                } else {
                    throw new Error("Item id not found")
                }
       
            })
            .catch(( err ) => {
                next(err)
            })
    }

}