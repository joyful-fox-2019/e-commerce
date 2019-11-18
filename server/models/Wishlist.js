const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const wishlistSchema = new Schema({
    userId: {
        type: ObjectId,
        ref: 'User'
    },
    productId: {
        type: ObjectId,
        ref: 'Product'
    }
}, { timestamps: true })

module.exports = mongoose.model('Wishlist', wishlistSchema)
