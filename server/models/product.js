const { Schema, model } = require('mongoose')

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required']
    },
    price: {
      type: Number,
      required: [true, 'Price is required']
    },
    image: String,
    stock: {
      type: Number,
      required: [true, 'stock is required'],
      min: [1, 'minimal stock 1']
    },
    seller: {
      type: Schema.Types.ObjectId,
      required: [true, 'Seller is required'],
      ref: 'User'
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

const Product = model('Product', productSchema)

module.exports = Product
