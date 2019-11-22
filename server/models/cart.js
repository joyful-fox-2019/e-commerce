const { model, Schema } = require('mongoose');

const CartSchema = new Schema({
  UserId: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  product: [] // ini isinya populate manual productId + count 
}, {timestamps: true})

CartSchema.pre('save',function (next) {
  this.ProductId = [];
  next()
})

const Cart = model('carts', CartSchema);

module.exports = Cart;


/*
plan schema Cart

[
  product: {
    ...
  },
  count: 0
]

*/

