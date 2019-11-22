const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { hashPassword } = require('../helpers/bcrypt')
const uniqueValidator = require('mongoose-unique-validator')

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, `Username is required!`],
    unique: true
  },
  email: {
    type: String,
    required: [true, `Email is required!`],
    match: [/^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Invalid email format."],
    unique: true
  },
  password: {
    type: String,
    required: [true, `Password is required!`]
  },
  role: {
    type: String,
    default: 'customer'
  }
}, {
    versionKey: false
  })

UserSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' })
UserSchema.pre('save', function (next) {
  this.password = hashPassword(this.password)
  next()
})

const User = mongoose.model('User', UserSchema)
module.exports = User