const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TransactionSchema = new Schema ({
    BuyerId: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    product: [{
        type: Schema.Types.ObjectId,
        ref: 'Products'
    }],
    count: [{
        type: Number
    }],
    price: {
        type: Number
    },
    status: {
        type: Boolean
    }
})

const Transaction = mongoose.model('Transactions', TransactionSchema)

module.exports = Transaction