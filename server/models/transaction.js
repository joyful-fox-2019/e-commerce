const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TransactionSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  products: [{
    type: Schema.Types.ObjectId, 
    ref: 'Product'
  }],
  carts: [{
    type: Schema.Types.ObjectId,
    ref: 'Cart'
  }],
  status: {
    type: String,
    default: 'Pending'
  },
  totalPrice: Number
}, {
  timestamps: true
})

const Transaction = mongoose.model('Transaction', TransactionSchema)
module.exports = Transaction