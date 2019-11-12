const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    UserId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    ProductId: [ Schema.Types.ObjectId ]
},{
    timestamps: true
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;