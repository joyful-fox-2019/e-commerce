const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    seller : {type : String, required : [true, 'seller is required']},
    name : {type : String, required : [true, 'name is required']},
    description : {type : String, default:'no description'},
    image : {type : String, default : 'http://www.stylemefancy.com/wp-content/themes/pinnace12/assets/images/no-thumbnail-medium.png'},
    price : {type : Number, required : [true, 'price is required']},
    stock : {type : Number, default : 0, required : [true, 'stock is required']}
},{versionKey : false})

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product