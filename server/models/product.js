const { Schema, model } = require('mongoose')

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name must be defined']
  },
  image: {
    type: String
  },
  stock: {
    type: Number,
    min: [0, 'Stock must be minimum 0']
  },
  price: {
    type: Number,
    min: [0, 'Price must be minimum 0']
  }
},{timestamps: true})

const Product = model('Product', productSchema)

module.exports = Product