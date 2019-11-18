const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'email not valid'],
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
    }
})

userSchema.pre('save', function (next) {
    this.role = 'customer'
    next()
})
const User = model('User', userSchema);

module.exports = User;