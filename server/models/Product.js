const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name can not be empty']
    },
    price: {
        type: Number,
        required: [true, 'Price can not be empty']
    },
    image: String
},{
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;