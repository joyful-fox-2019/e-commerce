const { Schema, model } = require ('mongoose')

const transactionSchema = new Schema({
  productsList: [{
    type: Schema.Types.ObjectId,
    ref: 'Cart'
  }],
  UserId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  totalCost: {
    type: Number
  },
  status: {
    type: String
  }
},{timestamps: true})

const Transaction = model('Transaction', transactionSchema)

module.exports = Transaction