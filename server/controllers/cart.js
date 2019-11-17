const Cart = require('../models/cart')

class CartController{
    static seeCart(req, res, next){
        Cart.find({UserId : req.loggedUser.id}).populate('UserId').populate('ProductId')
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(next)
    }

}

module.exports = CartController