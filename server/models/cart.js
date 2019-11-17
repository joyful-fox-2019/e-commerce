const { Schema, model } = require('mongoose')

let cartSchema = new Schema({
  UserId: {
    type: Schema.Types.ObjectID,
    ref: 'User'
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  quantity: {
    type: Number,
    min: 0
  },
  isCheckedOut: {
    type: Boolean,
    default: false
  },
})

const Cart = model("Cart", cartSchema);

module.exports = Cart