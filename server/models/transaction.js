const { model, Schema } = require('mongoose')

const TransSchema = new Schema({
  CartId: {
    type: Schema.Types.ObjectId,
    ref: 'products'
  },
  status: Boolean
}, {timestamps: true})

TransSchema.pre('save', function (next) {
  this.status = false;
  next()
})

const Transaction = model('transactions', transSchema);

module.exports = Transaction;