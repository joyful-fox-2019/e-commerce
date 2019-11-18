const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    { hash } = require('../helpers/bcrypt');

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Please enter your username']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email address.'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please enter a valid email address'
        ]
    },
    password: {
        type: String,
        required: [true, "Please enter your password"]
    },
    cart: [
        {
            product_id: {
                type: Schema.Types.ObjectId,
                ref: 'Product'
            },
            product_name: String,
            product_price: Number,
            product_stock: Number,
            product_image: String,
            quantity: Number
        }
    ],
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    versionKey: false
})

userSchema.pre('save', function (next) {
    this.password = hash(this.password)
    next()
    // if (this.isGoogle == false) {
    // } else {
    //     this.password = hash(process.env.PASSWORD_USER)
    //     next()
    // }
})

const User = mongoose.model('User', userSchema)

module.exports = User

