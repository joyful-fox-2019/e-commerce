const mongoose = require('mongoose')
const Schema = mongoose.Schema

const products = new Schema({

  name : {
    type : String,
    required : [true,'Product\'s name is required']
  },
  price : {
    type : Number,
    required : [true,'Product\'s price is required'],
    min : [1000,'Product\'s price minimal 10000'],
    max : [1000000,"Product's price maximal 1000000"]
  },
  stock : {
    type : Number,
    required : [true, 'Product\'s stock is required'],
    min : [0, 'Product\'s stock minimal 0']
  },
  detail : {
    type : String,
    required : [true, 'Product\'s detail is required']
  },
  image : {
    type : String,
    default : 'https://imageog.flaticon.com/icons/png/512/36/36601.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF'
  }

},{
  versionKey : false,
  timestamps : true
})

const Product = mongoose.model('Product',products)
module.exports = Product