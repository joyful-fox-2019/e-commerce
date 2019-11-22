const mongoose = require('mongoose')
const { hashPassword } = require('../helpers/bcrypt')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already registered'],
        required: [true, 'Email cant be empty']
    },
    password: {
        type: String,
        minlength: [5, 'Minimum password is 5 characters length'],
        required: [true, 'Password cant be empty']
    },
    role: {
        type: String,
        required: [true, 'You must choose your role']
    }
}, {
    versionKey: false
})

UserSchema.pre('save', function(next) {
    this.password = hashPassword(this.password)
    next()
})

const User = mongoose.model('Users', UserSchema)

module.exports = User