const mongoose = require('mongoose')

let Schema = mongoose.Schema

let transactionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  productList: [{
    type: Schema.Types.ObjectId,
    ref: "Product"
  }],
  status: {
    type: String,
    default: 'onProgress'
  },
  totalPrice: {
    type: Number
  }
}, 
{
  timestamps:true, 
  versionKey: false
})

let Transaction = mongoose.model('Transaction',transactionSchema)

module.exports = Transaction
