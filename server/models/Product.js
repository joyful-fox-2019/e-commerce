const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    product: {
        type: String,
        required: [true, "Input your product name"]
    },
    stock: {
        type: Number,
        required: [true, "Input your product stock"],
        min: [1, "At least must be 1"]
    },
    SellerId: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    },
    category: {
        type: String,
        required: [true, "Input your product category"]
    },
    price: {
        type: Number,
        required: [true, "Input your product price"],
        min: [1, "At least must be 1"]
    },
    picture: String,
    sold: Number
}, {
    versionKey: false
})

const Product = mongoose.model("Products", ProductSchema)

module.exports = Product