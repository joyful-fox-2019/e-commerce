const mongoose = require('mongoose')
const Schema = mongoose.Schema

let productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  img: {
    type: String,
    required: [true, 'Image is required']
  },
  stock: {
    type: Number,
    required: [true, 'Stock is required']
  },
  price: {
    type: Number,
    required: [true, 'Price is required']
  },
  category: {
    type: String, 
    required: [true, 'Category is required']
  }
})

let Product = mongoose.model('Product', productSchema)

module.exports = Product