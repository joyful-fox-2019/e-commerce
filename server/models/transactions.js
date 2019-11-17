const { Schema,model } = require('mongoose')
const ObjectId = Schema.Types.ObjectId

const transactionSchema = new Schema({
  UserId: {
    type: ObjectId,
    ref: 'User'
  },
  product: [{
    ProductId: {
      type: ObjectId,
      ref: 'Product'
    },
    amount: {
      type: Number,
    },
    ProductName: String,
    ProductPrice: Number
  }],
  total: {
    type: Number
  },
  status: {
    type: Boolean,
    default: false
  }
}, { timestamps:true,versionKey:false })

const Transaction = model('Transaction', transactionSchema)
module.exports = Transaction