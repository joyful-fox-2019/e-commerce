const Cart = require('../models/cart')

class cartController {
    static getOne(req, res, next) { //Cart-BUTTON in Navbar (HOME)
        Cart.findOne({
            user: req.LoggedUser.id
        })
            .then(cart => {
                res.status(200).json(cart)
            })   
            .catch(next)
    }

    static addProductToCart(req, res, next) { //Add to Product's BUTTON (HOME)
        Cart.findByIdAndUpdate(req.params.id, {
            $push: {
                product: req.body.product //Array of object (productId and quantity)
            }
        })
    }

    static removeProductInCart(req, res, next) { //Remove BUTTON (CART)
        Cart.findByIdAndUpdate(req.params.id, {
            $pull: {
                product: req.body.product //Array of object (productId and quantity)
            }
        })
            .then(cart => {
                res.status(200).json(cart)
            })
            .catch(next)
    }

    // updateProductQuantitiyInCart(req, res, next) {
        
    // }
}

module.exports = cartController