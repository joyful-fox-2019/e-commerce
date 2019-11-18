const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { hash } = require('../helpers/hash')

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is not valid'],
        validate: {
            validator: function(v){
                return this.model('User').findOne({ email: v })
                    .then(user =>{
                        return !user
                    })
            },
            message: props => `${ props.value } is already used by another user`
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    firstName: {
        type: String,
        default: 'username'
    },
    profilePic: {
        type: String,
        default: 'https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1'
    },
    lastName:{
        type: String,
    },
    address: {
        type: String,
        required: [true, 'Address is required']
    }
}, { timestamps: true })

userSchema.pre('save', function(done){
    this.password = hash(this.password)
    done()
})

module.exports = mongoose.model('User', userSchema)