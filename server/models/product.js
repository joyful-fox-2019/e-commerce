const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, `Name is required`],
        minlength: [3, `Minimum name length is 3`]
    },
    description: {
        type: String,
        required: [true, `Description is required`]
    },
    price: {
        type: Number,
        required: [true, `Price is required`],
        min: [1, `Price at least 1`]
    },
    stock: {
        type: Number,
        required: [true, `Stock is required`],
        // min: [1, `Stock at least 1`]
    },
    featured_image: {
        type: String,
        default: null
    },
    status: {
        type: Boolean,
        default: true
    },
    UserId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},{
    timestamps: true
});

const Product = model("Product", productSchema);

module.exports = Product;