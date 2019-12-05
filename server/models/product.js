const mongoose = require('mongoose')

let Schema = mongoose.Schema

let productSchema = new Schema({
  name: {
    type:String,
    required: [true, 'Name is required']
  },
  description: {
    type:String,
    required: [true, 'Description is required']
  },
  price: {
    type:Number,
    required: [true, 'Price is required']
  },
  stock: {
    type:Number,
    required: [true, 'Stock is required'],
    min: [1, 'Minimum stock is one']
  },
  image: {
    type:Array,
    validate: {
      validator: function(v) {
          if(v.length > 0){
              return true
          }
          else{
              return false
          }
      },
      message: props => `Image is required`
    }
  },
  tags: {
    type:Array
  }
}, 
{
  timestamps:true, 
  versionKey: false
})

let Product = mongoose.model('Product',productSchema)

module.exports = Product
