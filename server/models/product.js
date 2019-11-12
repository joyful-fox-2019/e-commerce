const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productName: {
        type: String,
        required: [true, "productName cannot be empty"]
    },
    description: {
        type: String,
        required: [true, "description cannot be empty"]
    },
    quantity: {
        type: String,
        min: [0, "Quantity cannot have negative value"],
        required: [true, "quantity cannot be empty"]
    },
    price: {
        type: Number,
        min: [0, "Price cannot have negative value"],
        required: [true, "quantity cannot be empty"]
    },
    adminId: {
        type: Schema.Types.ObjectId
    },
    imageUrl:{
        type: String
    }
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product