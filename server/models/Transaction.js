const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  user_id: { 
    type: Schema.Types.ObjectId,
    ref: 'User' 
  },
  products: [{ 
    product_id: {
      type: Schema.Types.ObjectId, 
      ref: 'Product' 
    },
    amount: {
      type: Number
    }
  }],
  status: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction