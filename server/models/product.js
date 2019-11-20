const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const ProductShema = new Schema ({
    name : {
        type : String,
        required : [true, 'please input product name']
    },
    description : {
        type: String
    },
    price : {
        type : Number,
        required : [true, 'please input product price']
    },
    images : {
        type : []
    },
    stock : {
        type : Number,
        required : [true, 'please input product stocks']
    }
})

const Product = mongoose.model('Product',ProductShema)

module.exports = Product