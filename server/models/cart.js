const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const cartSchema = new Schema({
    UserId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    ProductId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: [true, `Product is required`]
    },
    qty: {
        type: Number,
        required: [true, `Quantity is required`],
        min: [1, `Minimum quantity is 1`]
    }
},{
    timestamps: true
});

const Cart = model("Cart", cartSchema);

module.exports = Cart;