const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongooseValidator = require('mongoose-validator')
const hashPassword = require('../helpers/hashPassword')

let userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: [
            mongooseValidator({
                validator: 'isEmail',
                message: 'Invalid email format'
            })
        ]
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Minimum of passwords length is 6']
    },
    address: {
        type: String, 
        required: [true, 'Address is required']
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'Cart'
    },
    transaction: {
        type: Schema.Types.ObjectId,
        ref: 'Transaction'
    }
})

userSchema.pre('save', function(next) {
    this.password = hashPassword(this.password)
    next()
})

let User = mongoose.model('User', userSchema)

module.exports = User