const mongoose = require('mongoose');
const Password = require('../helpers/hashPassword');
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'username cannot be empty']
    },
    email: {
        type: String,
        required: [true, 'email cannot be empty'],
        validate: {
            validator(value) {
                let isEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                let valid = isEmail.test(value)
                return valid
            },
            message: 'Your email is not valid'
        }
    },
    password: {
        type: String,
        required: [true, 'password cannot be empty'],
        minlength: [8, "Password minimal 8 digits"]
    }
})

userSchema.pre('save', function (next) {
    let newPassword = Password.hash(this.password);
    this.password = newPassword
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User