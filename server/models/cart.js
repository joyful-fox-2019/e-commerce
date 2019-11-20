const mongoose = require('mongoose')
const { Schema, model  } = mongoose

const cartSchema = new Schema({
    productId : {
        type : Schema.Types.ObjectId,
        ref : 'Product'
    },
    quantities : {
        type : Number,
        required : true
    },
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    status : {
        type: Boolean,
        default: false
    }
},{
    timestamps: true,
    versionKey: false
})

module.exports = model('Cart',cartSchema)