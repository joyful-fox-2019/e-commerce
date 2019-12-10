const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Product = require('./product')

const CartSchema = new Schema({
  idProduct: {
    type: Schema.Types.ObjectId,
    ref: "Product"
  },
  idUser: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  qty: {
    type: Number,
    min: 0
  },
  status: {
    type: Boolean,
    default: false
  }
}, {
    versionKey: false
  })

const Cart = mongoose.model('Cart', CartSchema)
module.exports = Cart