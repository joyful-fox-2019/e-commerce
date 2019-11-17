const mongoose = require('mongoose')
const { Schema } = mongoose

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, `Product Must Have a Name`]
  },
  price: {
    type: Number,
    required: [true, `Product Must Have Price`],
    min:[0, `Cant Set Negative Value`]
  },
  stock: {
    type: Number,
    required: [true, `Product Must Have Stock`],
    min:[0, `Cant Set Negative Value`]
  },
  img: {
    type: String
  }  
}, { timestamps: true, versionKey:false })

const Product = mongoose.model('Product', productSchema)
module.exports = Product