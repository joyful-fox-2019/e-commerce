const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CartSchema = new Schema({
    UserId : { type: Schema.Types.ObjectId, ref: 'User'},
    ProductId : {type: Schema.Types.ObjectId, ref: 'Product'},
    amount : {type: Number, default : 1}
},{versionKey : false})

const Cart = mongoose.model('Cart', CartSchema)

module.exports = Cart