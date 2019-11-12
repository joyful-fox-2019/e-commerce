const mongoose = require('mongoose')
const Schema = mongoose.Schema

let transactionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'Cart'
    }
})

let Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction