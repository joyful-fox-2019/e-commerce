const { Schema, model } = require('mongoose')

const productSchema = new Schema({
  name : {
    type : String,
    required : [true, `Please define your schema`]
  },
  imageSource : {
    type : String,
    required : [true, 'Image source cannot be empty']
  },
  price : {
    type : Number,
    required : [true, 'Image source cannot be empty']
  },
  description : {
    type : String,
    required : [true, `Please give your product a description`]
  },
  stock : {
    type : Number,
    required : [true, 'Image source cannot be empty']
  }
}, {
  versionKey : false
})

const Product = model('Product', productSchema)

module.exports = Product