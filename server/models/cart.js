const { Schema, model } = require('mongoose')

const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId, ref: 'User', 
        required: [true, 'userId is required']
    },
    itemId: { 
        type: Schema.Types.ObjectId, ref: 'Item', 
        required: [true, 'itemId is required']
    },
    qty: {
        type: Number,
        required: [true, 'qty is required'],
        min: [1, 'qty min 1'],
    },
    subPrice: {
        type: Number,
    },
    status: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })


const Cart = model('Cart', cartSchema)

module.exports = Cart