const Cart = require('../models/Cart')

class CartController {
    static create (req,res,next) {
        let userId = req.loggedUser._id
        let { productId } = req.params
        Cart.findOne({userId,productId})
            .then(data=>{
                if(data) {
                    let newQty = data.qty + 1
                    return Cart.findOneAndUpdate({userId,productId},{$set: {qty: newQty}}, {new: true})
                } else {
                    return Cart.create({userId,productId})
                }
            })
            .then(data=>{
                res.status(201).json(data)
            })
            .catch(next)
    }
    static getCart (req,res,next) {
        let userId = req.loggedUser._id
        Cart.find({userId})
            .then(data=>{
                res.json(data)
            })
            .catch(next)
    } 
    static delete (req,res,next) {
        let {id} = req.params
        Cart.deleteOne({_id:id})
            .then(_=>{
                res.json({message:'cart deleted'})
            })
            .catch(next)
    }
}

module.exports = CartController