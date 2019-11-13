const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, `Please input product's name.`]
    },
    stock: {
        type: Number,
        default: 1,
        min: [1, 'minimal stock 1']
    },
    description: {
        type: String,
        minlength: [10, 'description product minimal 10 character']
    },
    image: {
        type: String,
        default: `https://discountseries.com/wp-content/uploads/2017/09/default.jpg`
    },
    category: [{
        type: String,
    }],
    price: {
        type: Number,
        required: [true, `Please enter product's price`]
    }
}, { versionKey: false })


const Product = mongoose.model('Product', productSchema)
module.exports = Product
