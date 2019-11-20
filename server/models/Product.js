const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is empty'],
    minlength: [10, 'Title too short'],
    maxlength: [100, 'Title too long']
  },
  description: {
    type: String,
    required: [true, 'Description is empty'],
    minlength: [50, 'Description too short'],
    maxlength: [500, 'Description too long']
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  stock: {
    type: Number,
    required: [true, 'Stock is empty'],
    min: [1, 'stock can`t be 0']
  },
  price: {
    type: Number,
    required: [true, 'Price is empty'],
    min: [100, 'Price too cheap']
  },
  image: {
    type: String
  },
  gender: {
    type: String,
    required: [true, 'Gender is empty']
  }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema)

module.exports = Product