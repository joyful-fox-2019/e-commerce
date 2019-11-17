`use strict`
const { Schema, model} = require('mongoose')

const transactionSchema = Schema({
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    carts : {
        type : Array,
        required : [true, 'you must input the products']
    },
    status : {
        type : String,
        enum : ['unpaid', 'process', 'complete','expired'],
        default : "unpaid"
    },
    dueDate : {
        type : Date,
    } 
}, {timestamps : true},{versionKey : false})

const Transaction = new model('Transaction', transactionSchema)

module.exports = Transaction