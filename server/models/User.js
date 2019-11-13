const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const {hash, compare} = require('../helpers/bcrypt')
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'Username is empty']
  },
  email: {
    type: String,
    required: [true, 'Email is empty'],
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email']
  },
  password: {
    type: String,
    required: [true, 'Password is empty']
  },
  admin: {
    type: Boolean,
    default: false
  },
  cart: [{
    product_id: {
      type: Schema.Types.ObjectId, 
      ref: 'Product'
    },
    amount: {
      type: Number
    }
  }]
}, {
  timestamps: true
});

userSchema.plugin(uniqueValidator, {message: '{PATH} already registered'})

userSchema.pre('save', function(next) {
  this.password = hash(this.password)
  next()
});

const User = mongoose.model('User', userSchema)

module.exports = User