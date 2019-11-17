const mongoose = require('mongoose')
const { Schema } = mongoose

const cartSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  qty: {
    type: Number,
    required: [true, 'Quantity cannot be empty']
  }
}, {
  versionKey: false
})

cartSchema.index({ product: 1, customer: 1 }, { unique: true });

module.exports = mongoose.model('Cart', cartSchema)