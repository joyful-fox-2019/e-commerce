const Cart = require('../models/cart')

function authorization(req, res, next) {
    Cart.find()
        .then(cart => {
            if(cart._id === req.user.id){
                next()
            }else{
                throw ({
                    code: 403,
                    message: 'You dont have permission'
                })
            }
        })
        .catch(err => {
            next(err)
        })
}

module.exports = authorization;