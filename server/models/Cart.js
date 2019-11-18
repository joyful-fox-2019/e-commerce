const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    items: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
        },
        seller: {
            type: Schema.Types.ObjectId, 
            ref: 'User',
            required:[true, 'seller is required']
        },
        qty: {
            type: Number,
            min: [1, 'minimum quatity is one']
        }
    }]
}, { timestamps: true })

module.exports = mongoose.model('Cart', cartSchema)