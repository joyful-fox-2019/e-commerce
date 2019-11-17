const { Schema, model } = require('mongoose')
const bcrypt = require('../helpers/bcrypt')

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please input your name']
  },
  email: {
    type: String,
    required: [true, 'Please input your email address'],
    validate: [{
      validator: function (v) {
        let emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
        return emailRegex.test(v)
      },
      message: props => `Invalid email format`
    }, {
      validator: function (value) {
        return User.find({
          _id: { $ne: this._id },
          email: value
        })
          .then(data => {
            if (data.length !== 0) {
              throw new Error('E-mail has been used to registered')
            }
          })
      }
    }]
  },
  password: {
    type: String,
    required: [true, 'Please input your password'],
    minlength: [5, 'Please input minimum 5 characters']
  },
  isAdmin: {
    type: Boolean
  },
  address: {
    type: String
  },
  city: {
    type: String,
    required: [true, 'Please input your city']
  }
});

userSchema.pre('save', function (next) {
  this.email = this.email.toLowerCase()
  this.password = bcrypt.hash(this.password)
  next()
})

const User = model('User', userSchema)

module.exports = User