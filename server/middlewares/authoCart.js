const Cart = require('../models/cart')
module.exports = (req,res,next) => {
    Cart.findOne({_id: req.params.cartId})
        .then(function (cart) {
            if (cart.userId == req.decoded.payload.id) {
                next()
            }else {
                next({status: 403, message: 'You dont have authorize to do that'})
            }
        })
        .catch(next)
 
}