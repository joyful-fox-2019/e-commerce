const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const itemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    rps: {
        type: Number,
        required: true
    },
    image: {
        type: String
    }
})

const Item = model('Item', itemSchema);

module.exports = Item;