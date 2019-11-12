const mongoose = require('mongoose')
const { Schema } = mongoose
const { hashPassword } = require('../helpers/bcryptjs')

const userSchema = new Schema({
  fullName: {
    type: String,
    required: [true, 'Name cannot be empty']
  },
  email: {
    type: String,
    required: [true, 'Email cannot be empty'],
    unique: true,
    validate: {
      validator (email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      },
      message: props => `${props.value} is not a valid email format`
    }
  },
  password: {
    type: String,
    required: [true, 'Password cannot be empty'],
    minlength: [6, 'Password have to be at least 6 characters']
  },
  isAdmin: {
    type: Boolean
  }
}, {
  versionKey: false
})

userSchema.pre('save', function () {
  try {
    this.password = hashPassword(this.password)
  } catch (err) {
    next(err)
  }
})

module.exports = mongoose.model('User', userSchema)