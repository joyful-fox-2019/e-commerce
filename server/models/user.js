`use strict`
const {hashPassword} = require('../helpers/bcrypt')
const {Schema, model} = require('mongoose')

const userSchema = Schema({
    username : {
        type : String,
        required : [true, 'you must input username']
    },
    email : {
        type : String,
        required : [true, 'you must enter your email'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Enter valid email'],
        validate : {
            validator : function(v) {
                return User.findOne({
                    email : v
                }).then(user => {
                    if (user) {
                        return false
                    } else {
                        return true
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            msg : `email already registered`
        }
    },
    password : {
        type : String,
        required : [true, 'you must enter your password'],
    },
    photo : {
        type : String,
        default : 'https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'      
    },
    role : {
        type : String,
        default : 'costumer'
    },
    membership : {
        type : String,
        enum : ['silver', 'gold', 'platinum'],
        default : 'silver'
    } 
}, {timestamps : true},{versionKey : false})


//bikin hooks
userSchema.pre('save', function(next) {
    this.password = hashPassword(this.password)
    next()
})


const User = model('User', userSchema)
module.exports = User
