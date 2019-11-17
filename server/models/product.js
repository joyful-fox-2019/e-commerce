const {Schema, model} = require("mongoose");

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description:{
        type: String
    },
    image:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    seller:{
        type: Schema.Types.ObjectId, ref: 'User'
    },
    status:{
        type: String
    },
    stock: {
        type: Number
    },
    genre:{
        type: String
    }
}, {
    timestamps: true,
    versionKey: false
})

const Product = model('Product', productSchema);

module.exports = Product;