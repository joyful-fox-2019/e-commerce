const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const transactionSchema = new Schema({
    BuyerId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    address: {
        type: String,
        required: [true, `Address is required`]
    },
    products: {
        type: Array,
        required: [true, `Products must not empty`]
    },
    status: {
        type: String,
        required: [true, `Status is required`]
    }
},{
    timestamps: true
});

const Transaction = model("Transaction", transactionSchema);

module.exports = Transaction;