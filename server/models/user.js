const mongoose = require('mongoose')
const { Schema } = mongoose
const { genHash } = require('../helpers/bcrypt')

const userSchema = new Schema({
  username: {
    type: String, 
    required: [true, 'Username is required'],
    minlength: [4, 'Username minimum length is 4 characters'],
    validate: {
      validator: function (value) {
        return User.findOne({ username: value })
        .then(user => {
          if(user) return false
        })
      }, message: 'This username is already taken'
    }
  },
  email: {
    type: String,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email address format'],
    required: [true, 'Email is required'],
    validate: {
      validator: function (value) {
        return User.findOne({ email: value })
          .then(user => {
            if(user) return false
          })
      }, message: 'This email address is already taken'
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password minimum length is 6 characters']
  },
  cart: [{
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    qty: { type: Number, min: 1 }
  }],
  notification: [{
    message: { type: String },
    status: { type: String}
  }],
  role: { type: String, default: 'user' }
}, { versionKey: false, timestamps: true })

userSchema.pre('save', function(next){
  this.password = genHash(this.password)
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User