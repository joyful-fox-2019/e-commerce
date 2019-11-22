const mongoose = require('mongoose')
const { Schema } = mongoose

const transactionsSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  products: [
    {
    type : Schema.Types.ObjectId,
    ref: 'Product'
    }
  ],
  status: {
    type: String,
    default: 'pending'
  }
})

const Transactions = mongoose.model('Transactions', transactionsSchema)
module.exports = Transactions