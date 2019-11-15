const { Schema, model } = require('mongoose')

const productSchema = new Schema ({
    name: {
        type: String,
        required: [true, 'Product Name is required']
    },
    price: {
        type: String,
        required: [true, 'Price is required']
    },
    stock: {
        type: String,
        required: [true, 'Stock is required']
    },
    image: String
}, {
    timestamps: true
})

const Product = model('Product', productSchema)
module.exports = Product