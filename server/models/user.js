const { Schema, model } = require('mongoose')
const { hashPassword } = require('../helpers/passwordEncryptor')

const userSchema = new Schema ({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email format']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    role: {
        type: String,
        default: 'customer'
    },
    cart: [
        {
            product_id: {
                type: Schema.Types.ObjectId,
                ref: 'Product'
            },
            product_name: String,
            product_price: Number,
            product_image: String,
            quantity: Number
        }
    ]
}, {
    timestamps: true
})

userSchema.pre('save', function(next) {
    this.password = hashPassword(this.password)
    next()
})

const User = model('User', userSchema)
module.exports = User