const mongoose = require('mongoose')
const generateHash = require('../helpers/generateHash')
const { Schema } = mongoose

const userSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    unique: [true, 'Email address has already been used!'],
    validate: [{
      validator: function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      },
      message: props => `${props.value} is not a valid email address!`
    }]
  },
  password: {
    type: String,
    minlength: [5, 'Your password is too short! Please input a password between 5 to 20 characters.'],
    maxlength: [20, 'Your password is too long! Please input a password between 5 to 20 characters.']
  },
  role: {
    type: 'String',
    unique: [true, 'Please input your role!']
  }
})

userSchema.pre('save', function (next) {
  const hash = generateHash(this.password)
  this.password = hash
  next()
})

const User = mongoose.model('User', userSchema)
module.exports = User 