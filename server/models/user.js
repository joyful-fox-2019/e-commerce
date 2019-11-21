const { hashPassword } = require('../helpers/bcrypt')
const mongoose = require('mongoose')
const { Schema, model  } = mongoose

const userSchema = new Schema({
    name : {
        type : String,
        required: [true, 'name is required']
    },
    email : {
        type : String,
        required: [true, 'email is required'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid Email Format'],
        unique:true
    },
    password : {
        type : String,
        required: [true, 'password is required'],
        minlength: [4, 'Password Minimum Contain 4 Character']  
    },
    imgUrl : {
        type : String,
    },
    role : {
        type : String,
        default : 'customer'
    },
    itemCheckout : {
        type: Array
    }
},{
    versionKey: false,
})

userSchema.pre('save',function(next){
    this.password = hashPassword(this.password)
    next()
})

module.exports = model('User',userSchema)