const mongoose = require('mongoose')

const cartSchema = mongoose.Schema ({
    productId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    amounts : {
        type: Number,
        required: [true, 'Amount must be greater than 0']
    },
    totalPrice: {
        type: Number,
    },
    status: {
        type: Boolean,
        default: false
    }
})


const user = mongoose.model('Cart', cartSchema)
module.exports = user