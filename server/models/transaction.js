const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    UserId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    product:[{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    quantity:{
        type: Number,
        min: [0, "quantity cannot have negative value"]
    },
    totalCost:{
        type: Number,
        min: [0, "quantity cannnot have negative value"]
    }
}, 
{
    timestamps: true, 
    versionKey: false 
})

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports= Transaction