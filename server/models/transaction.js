const { model, Schema } = require('mongoose')

const TransSchema = new Schema({
  ProductId: [],
  status: Boolean,
  confirm: Boolean,
  payment: Number,
  UserId: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  StoreId: [
    {
      type: Schema.Types.ObjectId,
      ref: 'products'
    }
  ]
}, {timestamps: true})

TransSchema.pre('save', function (next) {
  this.status = false;
  this.confirm = false;
  next()
})

const Transaction = model('transactions', TransSchema);

module.exports = Transaction;