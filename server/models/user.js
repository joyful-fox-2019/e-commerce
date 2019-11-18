const mongoose = require('mongoose')
const {hashPass} = require('../helpers/hash')

const userSchema = new mongoose.Schema ({
    username: {
        type: String,
        validate: {
            validator: function (value) {
                return this.model('User').findOne ({username: value})
                .then(function (user) {
                    if (user) {
                        return false
                    }else {
                        return true
                    }    
                })
            },
            message: props => `${props.value} already taken`
        },
        required: [true, 'Username Cannot be Empty']
    },
    email: {
        type: String,
        validate: [{
            validator: function (email) {
                return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(email)
            },
            message: props => `${props.value} is not valid email format`
        },
        {
            validator: function (value) {
                return this.model('User').findOne({email: value})
                .then(function (email) {
                    if (email) {
                        return false
                    }else {
                        return true
                    }
                })
            },
            message: props => `${props.value} already taken, please take another one`
        }
    ],
        required: [true, 'Email Cannot be Empty']
    },
    password: {type: String, required: [true, 'Password Cannot be Empty']},
    balanced: {
        type: Number,
        default: 0,
    },
    shop: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            default: []
        }
    ]

},{versionKey: false})

userSchema.pre('save', function (next) {
    let pass = this.password
    this.password = hashPass(pass)
    next()
})

const user = mongoose.model('User', userSchema)

module.exports = user