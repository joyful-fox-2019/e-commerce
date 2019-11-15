const Cart = require('../models/cart')

class CartController{
    static seeCart(req, res, next){
        Cart.find({UserId : req.loggedUser.id}).populate('UserId').populate('ProductId')
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(next)
    }

    static createCart(req, res , next){
        // Cart.findOne({UserId : req.loggedUser.id})
        // .then(data=>{
        //     if(data){
        //         next({
        //             status : 400,
        //             message : 'cart for this user already exist'
        //         })
        //     }else{
        //         return Cart.create({UserId : req.loggedUser.id})
        //     }
        // })
        // .then(data=>{
        //     if(data){
        //         res.status(200).json({msg : 'cart created', data})
        //     }
        // })
        // .catch(next)
    }

    static removeCart(req,res,next){
        // let cartId = req.params.id
        // Cart.findOneAndDelete({_id : cartId})
        // .then(data=>{
        //     res.status(200).json({msg : 'cart deleted', data})
        // })
        // .catch(next) 
    }
}

module.exports = CartController