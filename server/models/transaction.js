const { model, Schema } = require('mongoose')

const TransSchema = new Schema({
  CartId: {
    type: Schema.Types.ObjectId,
    ref: 'products'
  },
  status: Boolean,
  payment: Number
}, {timestamps: true})

TransSchema.pre('save', function (next) {
  this.status = false;
  next()
})

const Transaction = model('transactions', TransSchema);

module.exports = Transaction;