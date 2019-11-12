const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productName: {
        type: String
    },
    description: {
        type: String
    },
    quantity: {
        type: String
    },
    price: {
        type: Number
    }
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product