const mongoose = require('mongoose')
const Schema  = mongoose.Schema;

let transactionSchema = new Schema({
     username:{
        type: String,
        required: true
    },
    carts:[{
        type: Schema.Types.ObjectId, 
        ref: 'Cart'
    }],
    status:{
        type: String,
        enum: ["pendingpayment", "pendingdelivery", "ondelivery", "delivered"],
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
},{versionKey: false})

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction