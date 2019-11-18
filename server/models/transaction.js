const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;
const ObjectId = Schema.Types.ObjectId;

const transactionSchema = new Schema({
    userId: {
        type: ObjectId,
        ref: 'User'
    },
    productId: {
        type: ObjectId,
        ref: 'Product',
    },
    count: {
        type: Number
    },
    totalPayment: {
        type: Number
    }
})

const Transaction = model('Transaction', transactionSchema);

module.exports = Transaction;