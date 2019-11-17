`use strict`
const {Schema, model} = require('mongoose')

const cartSchema = Schema({
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    product : {
        type : Schema.Types.ObjectId,
        ref : 'Product',
        required : [true, 'you must input the product']
    },
    isCheckout : {
        type : Boolean,
        default : false
    },
    totalPrice : {
        type : Number,
        min : 0,
        default : 0,
        required : [true, 'you must enter the price']
    },
    totalItem : {
        type : Number,
        default : 1,
        min : 1,
        required : [true, 'you must enter the item total']
    }
}, {timestamps : true},{versionKey : false})

const Cart = model('Cart', cartSchema)

module.exports = Cart