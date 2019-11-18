const Cart = require('../models/Cart')
const Product = require('../models/Product')

class CartController {

    static updateOrCreate(req, res, next){
        const userId = req.decode.id
        const { productId, seller, qty } = req.body
        let status = 200
        let cartModel = null
        Cart.findOne({ userId })
            .then(cart =>{
                if(cart){
                    cartModel = cart
                    return Cart.findOneAndUpdate({
                        userId, 'items.productId': productId 
                        },{
                        $inc: {
                           'items.$.qty' : qty
                        },
                    }, { new: true })
                }
                else {
                   status = 201
                   return Cart.create({ userId,  items: { productId, seller, qty } })
                }
            })
            .then(response =>{
                if(response){
                    return response
                }
                else {
                    cartModel.items.push({ productId, seller, qty })
                    return cartModel.save()
                }
            })
            .then(cart =>{
                res.status(status).json(cart)
            })
            .catch(next)
    }

    static changeQty(req,res, next){
        const userId = req.decode.id
        const { productId, qty } = req.body
        Cart.findOneAndUpdate({
            userId, 'items.productId': productId 
            },{
            $set: {
               'items.$.qty' : qty
            },
        }, { new: true })
        .then(cart =>{
            res.status(200).json(cart)
        })
        .catch(next)

    }

    static find(req, res, next){
        const userId = req.decode.id
        Cart.findOne({ userId }).populate('items.productId')
            .then(carts =>{
                res.status(200).json(carts)
            })
            .catch(next)
    }

    static removeItem(req, res, next){
        const userId = req.decode.id
        const itemId= req.params.id
        Cart.findOneAndUpdate({ userId, 'items._id': itemId }, { $pull: {items: { _id : itemId }} })
        .then(cart =>{
            res.status(200).json(cart)
        })
        .catch(next)
    }

}

module.exports = CartController































































/*
  const Cart = require('./models/Cart')
        Cart.findOne({
            'items._id' : '5dcbde18ef26175c5b9ce9d2'
         })
        //   {
        //     // $set: {
        //     //     'items.$.qty' : 10
        //     // }
        // })
        .then(cart => {
            console.log(cart, "<<")
        })
        .catch(err => {
            console.log(err)
        })

             const Cart = require('./models/Cart')
        Cart.update({
            'items._id' : '5dcbde18ef26175c5b9ce9d2'
        }, {
            $set: {
                'items.$.qty' : 10
            }
        }, { new: true })
            .then(cart => {
                console.log(cart, "<<")
            })
            .catch(err => {
                console.log
            })


            const Cart = require('./models/Cart')
        Cart.findOneAndUpdate({userId: '5dcc54a9796f58748973f1cd',
            'items.productId' : '5dcc54aa796f58748973f1cf'
        }, {
            $set: {
                'items.$.qty' : 10
            }
        }, { new: true })
            .then(cart => {
                console.log(cart, "<<")
            })
            .catch(console.log)

*/

// findOne cart items usernya 
// cari ada enggak 
// include -->
// 