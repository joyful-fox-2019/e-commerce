const { Schema, model } = require('mongoose')

const cartSchema = new Schema({
  UserId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  ProductId: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  qty: {
    type: Number,
    required: [true, 'Quantity is required'],
    default: 1
  }
}, {
  versionKey: false,
  timestamps: true
})

const Cart = model('Cart', cartSchema)

module.exports = Cart