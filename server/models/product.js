const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
    },
    image: {
        type: Array
    }
})

const Product = model('Product', productSchema);

module.exports = Product;