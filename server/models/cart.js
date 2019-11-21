const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;
const ObjectId = Schema.Types.ObjectId;

const cartSchema = new Schema({
    userId: {
        type: ObjectId,
        ref: 'User'
    },
    itemId: {
        type: ObjectId,
        ref: 'Item',
    },
    count: {
        type: Number
    },
    totalRps: {
        type: Number
    }
})

const Cart = model('Cart', cartSchema);

module.exports = Cart;