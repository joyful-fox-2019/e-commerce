const { Schema, model } = require('mongoose')

const cartSchema = new Schema({
  user : {
    type :  Schema.Types.ObjectId,
    ref: 'User',
    required : [true, `User cannot be empty`]
  },
  product : {
    type :  Schema.Types.ObjectId,
    ref: 'Product',
    required : [true, `Product cannot be empty`]
  },
  amount : {
    type : Number,
    required : [true, `Amount cannot be empty`]
  }
}, {
  versionKey : false
})

const Cart = model('Cart', cartSchema)

module.exports = Cart