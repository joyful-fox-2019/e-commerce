const { Schema, model} = require('mongoose')

const itemSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    description: {
        type: String,
        required: [true, 'description is required']
    },
    image: {
        type: String,
        required: [true, 'image is required']
    },
    price: {
        type: Number,
        required: [true, 'price is required']
    },
    stock: {
        type: Number,
        min: [1, 'minimum is 1'],
        required: [true, "stock is required"]
    },
},  { timestamps: true})

const Item = model('Item', itemSchema)

module.exports = Item