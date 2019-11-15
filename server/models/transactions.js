const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TransactionSchema = new Schema ({
    User_id:{
        type : Schema.Types.ObjectId, ref : 'User'
    },
    Product_id:{
        type : Schema.Types.ObjectId, ref : 'Product'
    },
    count : {
        type : Number
    },
    total_payment : {
        type : Number
    }
})

const Transaction = mongoose.model('Transaction',TransactionSchema)

module.exports = Transaction
