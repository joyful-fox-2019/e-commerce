const mongoose = require('mongoose')
const { Schema } = mongoose

const transactionSchema = new Schema({
  status: {
    type: String,
    required: [true, 'Status cannot be empty'],
    default: 'Waiting for confirmation'
  },
  carts: [{
    type: Schema.Types.ObjectId,
    ref: 'Cart'
  }],
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  total: {
    type: Number
  }
}, {
  versionKey: false
})

module.exports = mongoose.model('Transaction', transactionSchema)