const mongoose = require('mongoose')
const { Schema } = mongoose

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please input the name of the book!']
  },
  price: {
    type: Number,
    required: [true, 'Please input the price of the book!']
  },
  qty: {
    type: Number,
    required: [true, 'Please input the stock of the book!']
  },
  description: {
    type: String
  },
  imageUrl: {
    type: String
  },
  author: {
    type: String,
    required: [true, 'Please input the author\'s name!']
  }
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product