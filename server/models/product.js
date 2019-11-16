const { model,Schema } = require('mongoose')

const productSchema = new Schema({
  name: {
    type: String,
    required: "Name required"
  },
  price: {
    type: Number,
    required: "Price required"
  },
  imgUrl: {
    type: String,
    required: "imgUrl required"
  },
  qty:{
    type: Number,
    required: "Qty required"
  },
  hotProduct:{
    type: Boolean,
    default: false,
  }
},{ timestamps:true,versionKey:false })

const Product = model('Product', productSchema)
module.exports = Product