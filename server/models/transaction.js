const mongoose = require('mongoose')
const { Schema, model } = mongoose

const transactionSchema = new Schema({
  status : { type: String, default: 'pending'},
  price: { type: Number, min: 0 },
  items: [{ 
    product: { type: Schema.Types.ObjectId, ref: 'User'}, 
    qty: { type: Number, min: 1 }
  }],
  owner :{ type: Schema.Types.ObjectId, ref: 'User'}
},
{ versionKey: false, timestamps: true })

const Transaction = model('Transaction', transactionSchema)

module.exports = Transaction
