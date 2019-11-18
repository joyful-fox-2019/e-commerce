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
    images: {
      type: Array,
      default: ['https://storage.cloud.google.com/file-storage-fadilah/1573465535580-default_image.333c3368.png?hl=id']
    },
    stock: {
      type: Number,
      required: [true, 'stock is required'],
      min: [1, 'minimal stock 1']
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

const Product = model('Product', productSchema)

module.exports = Product
