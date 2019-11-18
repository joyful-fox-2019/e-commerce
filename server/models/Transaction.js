const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema({
   items:
  [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
        },
        seller: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'seller id is required']
        },
        qty: {
            type: Number,
            required: [true, `quantity is required`],
            min: [1, `minimum quantity is 1`]
        },
        status: {
            type: String,
            default: 'Order is on proccess',
        }
   }],
    totalPrice: {
        type: Number,
        required: [true, `price is require`],
        min: [1, `minimum price is 1`]
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })



module.exports = mongoose.model('Transaction', transactionSchema)