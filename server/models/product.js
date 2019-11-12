const mongoose = require('mongoose')
const Schema = mongoose.Schema

let productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    description: {
        type: String
    },
    img: {
        type: String
    },
    stock: {
        type: Number,
        required: [true, 'Stock is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }
})

let Product = mongoose.model('Product', productSchema)

module.exports = Product