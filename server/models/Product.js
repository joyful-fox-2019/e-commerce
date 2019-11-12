const mongoose = require('mongoose')
const { Schema } = mongoose

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Product name cannot be empty']
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: [true, 'Price cannot be empty'],
    min: [1, 'Price cannot be zero or less']
  },
  stock: {
    type: Number,
    required: [true, 'Product stock cannot be empty'],
    min: [1, 'Product stock cannot be zero or less']
  },
  published: {
    type: Date
  },
  writer: {
    type: String
  },
  penciler: {
    type: String
  }
}, {
  versionKey: false,
  timestamps: true
})

module.exports = mongoose.model('Product', productSchema)