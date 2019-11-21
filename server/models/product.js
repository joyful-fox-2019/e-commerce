const mongoose = require('mongoose')
const { Schema, model  } = mongoose

const productSchema = new Schema({
    name : {
        type : String,
        required: [true, 'name is required']
    },
    price : {
        type : Number,
        required: [true, 'Price is required'],
    },
    description : {
        type : String,
        required: [true, 'Description is required'],
    },
    imgUrl : {
        type : Array,
        validate : {
            validator : function(value){
                return value.length > 0 ? true : false
            },
            message: props => `image is required`
        }
    },
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    tag : {
        type : String
    },
    quantities : {
        type : Number
    }
},{
    timestamps: true,
    versionKey: false
})

module.exports = model('Product',productSchema)