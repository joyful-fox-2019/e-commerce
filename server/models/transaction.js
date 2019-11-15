const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TransactionSchema = new Schema({
    UserId : { type: Schema.Types.ObjectId, ref: 'User'},
    Products : [{
        productId : {type: Schema.Types.ObjectId, ref: 'Product'},
        name : {type : String}, 
        amount : {type : Number , default : 0},
        cost : {type : Number , default : 0},
        seller : {type : String}, 
    }],
    date : {type : Date, required : [true, 'date is required']},
    status : {type : Boolean, default : false},
    total : {type : Number, default : 0}
},{versionKey : false})

const Transaction = mongoose.model('Transaction', TransactionSchema)

module.exports = Transaction