const {
    Schema,
    model
} = require('mongoose')
const {
    hash
} = require('../helpers/bcrypt')

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please input your name'],
        validate: {
            validator: function (name) {
                return /^[A-Za-z]+$/.test(name)
            },
            message: props => `${props.value} is not a valid name`
        }
    },
    email: {
        type: String,
        required: [true, 'Please input your email'],
        unique: true,
        validate: {
            validator: function (email) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
            },
            message: props => `${props.value} is not a valid email address`
        }
    },
    password: {
        type: String,
        required: [true, 'Please input your password'],
        minlength: [7, 'Minimum password length is 7']
    },
    full_address: {
        type: String,
        required: [true, 'Please input your home address'],
        minlength: [5, 'Looks like you give an invalid home address']
    },
    role: {
        type: String,
        required: true,
        enum: ['Admin', 'Customer'],
        default: 'Customer'
    }
})

userSchema.pre('save', function (next) {
    this.password = hash(this.password)
    next()
})

const User = model('User', userSchema)

module.exports = User