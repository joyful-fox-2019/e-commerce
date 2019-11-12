const { Schema, model } = require('mongoose')
const { hashPassword, checkPassword } = require('../helpers/bcrypt')

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'invalid email format'],
        validate: [
            {validator: isEmailUnique, message: 'email already registered'}
        ],
    },
    password: {
        type: String,
        required: [true, 'password required'],
        minlength: [8, 'password min 8 char']
    },
    role: {
        type: String,
        default: 'customer'
    } 
}, {
    timestamps: true
})

//validation
function isEmailUnique(value) {
    return User.findOne({ email: value })
      .then(found => {
        if (found) return false
        else return true
      })
  }

//hashPassword
userSchema.pre('save', function(next) {
    this.password = hashPassword(this.password)
    next()
})

const User = model('User', userSchema)

module.exports = User