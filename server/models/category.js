const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema ({
    categoryName: {
        type: String
    },
    productId: {
        type: mongoose.Types.Schema, ref: 'Product'
    }
})

const category = mongoose.model('Category', categorySchema)

module.exports = category;