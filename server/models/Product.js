const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const productSchema = new Schema({
    userId: {
        type: ObjectId,
        ref: 'User'
    },
    name:{
        type: String,
        required: [true, 'Product name is required']
    },
    image: {
        type: String,
        required: [true, 'Product image is required']
    },
    desc:{
        type: String,
        required: [true, 'Product description is required']
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        min: [0, 'minimal product price is 0']
    },
    stock:{
        type: Number,
        required: [true, 'Product stock is required'],
        min: [0, 'minimal product stock is 0']
    },
    review:{
        type: String
    }
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)
