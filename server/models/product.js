`use strict`
const {Schema, model} = require('mongoose')

const productSchema = Schema({
    price : {
        type : Number,
        required : [true, 'you must input price']
    },
    qty : {
        type : Number,
        required : [true, 'you must input quantity'],
        min : 0,
        max : 99
    },
    name : {
        type : String,
        required : [true, 'you must input name']
    },
    image : {
        type : String,
        require : [true, 'you must input image'],       
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    category : {
        type : String,
        required : [true, 'you must input category']
    }
}, {timestamps : true},{versionKey : false})

const Product = model('Product', productSchema)

module.exports = Product