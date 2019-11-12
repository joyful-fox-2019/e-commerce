const mongoose = require('mongoose');
const Schema = mongoose.Schema

const cartSchema = new Schema({
    listProduct: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    quantity: {
        type: Number
    },
    price: {
        type: Number
    },
    UserId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart;