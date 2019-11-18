const mongoose = require('mongoose')

const productSchema = new mongoose.Schema ({
    productName: {
        type: String,
        required: [true, 'Product Name Cannot be Empty']
    },
    description: {
        type: String,
        required: [true, 'Description Cannot be Empty'],
    },
    category: {
        type: String,
    },
    stocks: {
        type: Number,
        min: [1, 'Product Amount must be greater than 0']
    },
    price: {
        type: Number,
        min: [1, 'Price Must be Greater than Zero']
    },
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    image: {
        type: String,
    },
    rating: {
        type: Number,
        default: 0
    },
    voting: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    ]
},{versionKey: false})

const product = mongoose.model('Product', productSchema)

module.exports = product