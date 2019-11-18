const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('../helpers/bcrypt');

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name can not be empty']
    },
    email: {
        type: String,
        required: [true, 'Email can not be empty'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
});

userSchema.pre('save', function(next) {
    this.password = bcrypt.generate(this.password);
    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;