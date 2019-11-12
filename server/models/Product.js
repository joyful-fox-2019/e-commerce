const mongoose = require('mongoose')

let Schema = mongoose.Schema

let productSchema = new Schema({
    name: {type: String},
    desc: {type:String},
    price: {type:Number},
    stock: {type:Number},
    image: {type:String}
},{ timestamps: true,versionKey:false })

let Product = mongoose.model('Product',productSchema)

module.exports = Product

