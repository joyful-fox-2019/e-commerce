const mongoose  = require('mongoose')

const transactionSchema = new mongoose.Schema({
    carts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart'
    }],
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    totalPrice: {
        type: Number
    }

},{timestamps: {createdAt: 'created_at'}})



const transaction = mongoose.model('Transaction', transactionSchema)

module.exports = transaction