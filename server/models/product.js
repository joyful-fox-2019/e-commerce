const mongoose = require('mongoose')
const { Schema, model } = mongoose

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    minlength: [4, 'Product name minimum length is 4 characters'],
    validate: {
      validator: function (value) {
        return Product.findOne({name: value})
        .then(product => {
          if(product) return false
        }) 
      }, message: 'This product name is not available'
    }
  },
  price: {
    type: Number,
    min: [0, 'Price cannot be a negative number'],
    required: [true, 'Price is required']
  },
  stock: {
    type: Number,
    min: [0, 'Stock cannot be a negative number'],
    default: 0,
    required: [ true, 'Stock is required']
  },
  sold: {
    type: Number,
    min: [0 , 'Sold item cannot be a negative number'],
    default: 0
  },
  image: {
    type: String,
    required: [true, 'Product image is required']
  },
  viewed: {
    type: Number,
    default: 0
  },
  favourites: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  likes:{
    type: Number, 
    default: 0,
    min: 0
  }
},{ versionKey: false, timestamps: true })

const Product = model('Product', productSchema)

module.exports = Product

