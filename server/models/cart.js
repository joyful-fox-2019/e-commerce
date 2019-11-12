const mongoose = require('mongoose')
const Schema = mongoose.Schema

let cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    product: []
})

let Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart