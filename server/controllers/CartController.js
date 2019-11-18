const Cart = require("../models/cart.js");

class CartController{
    static findAll (req, res, next) {
        let userId = req.params.user._id
        Cart.find({userId:userId,isCheckout:false}).populate("product")
            .then(( results ) => {
                //console.log(results)
                res.status(200).json(results);
            })
            .catch(( err ) => {
                next(err)
            })
    }
    static create (req, res, next) {
        let body = {
            userId: req.params.user._id,
            product: req.body.product,
        }
        Cart.findOne ({ userId: req.params.user._id, product:req.body.product, isCheckout:false })
            .then(( result ) => {
                if(result){
                    res.status(200).json({
                        message:"Already exist in user cart"
                    })
                } else {
                    return Cart.create(body)
                }
            })
            .then(( result ) => {
                res.status(201).json(result);
            })
            .catch(( err ) => {
                next(err)
            })
    }
    static delete (req, res, next) {
        let id = req.params.cartId;

        Cart.findByIdAndDelete(id)
            .then(( result ) => {
                if(result){
                    res.status(200).json({
                        message:"Delete Success"
                    })
                }
            })
            .catch(( err ) => {
                next(err)
            })
    }
    static update(req, res, next) {
        let updateVal = {}
        let id = req.params.cartId;
        req.body.isCheckout && (updateVal.isCheckout = req.body.isCheckout);
        req.body.count && (updateVal.count = req.body.count);

        Cart.findByIdAndUpdate(id, updateVal, {new:true})
            .then(result=>{
                res.status(200).json(result);
            })
            .catch(( err ) => {
                next(err)
            })
    }
}
module.exports = CartController;