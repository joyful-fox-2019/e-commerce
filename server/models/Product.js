const mongoose = require('mongoose')

let Schema = mongoose.Schema

let productSchema = new Schema({
    name: {
        type: String,
        required:[true,'name is required']
    },
    desc: {
        type:String,
        required:[true,'desc is required']
    },
    price: {
        type:Number,
        required:[true,'price is required']
    },
    stock: {
        type:Number,
        required:[true,'stock is required']
    },
    image: {
        type:String,
        required:[true,'image is required']
    },
    tags : [{
        type: String
    }]
},{ timestamps: true,versionKey:false })

let Product = mongoose.model('Product',productSchema)

module.exports = Product

