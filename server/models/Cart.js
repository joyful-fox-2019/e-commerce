const mongoose = require('mongoose')
const { Schema } = mongoose

const cartSchema = new Schema({
  products: [{
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    },
    qty: {
      type: Number
    }
  }],
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart