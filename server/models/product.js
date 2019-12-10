const {Schema, model} = require("mongoose");

const productSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Please enter product title']
    },
    description:{
        type: String,
        required: [true, 'Please enter product description']
    },
    image:{
        type: String,
        required: [true, 'Please enter product image']
    },
    price:{
        type: Number,
        required: [true, 'Please enter product price'],
        min: [0, 'Price can not be negative']
    },
    seller:{
        type: Schema.Types.ObjectId, ref: 'User'
    },
    status:{
        type: String
    },
    stock: {
        type: Number,
        required: [true, 'Please enter product stock'],
        min: [0, 'Stock can not be negative']
    },
    genre:{
        type: String,
        required: [true, 'Please enter product genre']
    }
}, {
    timestamps: true,
    versionKey: false
})

const Product = model('Product', productSchema);

module.exports = Product;