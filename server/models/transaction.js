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
  },
  status: {
    type: Boolean,
    default: false
  },
  total: {
    type: Number,
    required: [true, 'Total is required']
  },
  product: [],
  trackNumber: {
    type: String,
    default: '-'
  },
  trackNumberFilled: {
    type: Boolean,
    default: false
  },
  clearStatus: {
    type: String,
    default: 'Processed'
  }
}, {timestamps: { createdAt: 'created_at' }})

transactionSchema.pre('save', function(next) {
  const parsedDate = parseInt((this.created_at) / (1000 * 60 * 60 * 24), 10); 
  this.created_at = parsedDate
  next()
})

let Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction