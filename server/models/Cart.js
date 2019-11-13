const mongoose = require('mongoose')

let Schema = mongoose.Schema

let cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    qty: {
        type: Number,
        default: 1
    }
},{ timestamps: true,versionKey:false })

let Cart = mongoose.model('Cart',cartSchema)

module.exports = Cart

