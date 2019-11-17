const mongoose = require('mongoose')
const { Schema } = mongoose

const cartSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  quantity: {
    type: Number,
    min: [0, 'Amount of Product minimal Greater Than 0']
  } 
}, {timestamps: true, versionKey: false})

const Cart = mongoose.model('Cart', cartSchema)
module.exports = Cart
