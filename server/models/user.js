const { Schema,model } = require('mongoose')
const { generateHash } = require('../helpers/bcrypt')
const ObjectId = Schema.Types.ObjectId

const userSchema = new Schema({
  email: {
    type: String,
    required: 'Email required',
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email invalid format']
  },
  password: {
    type: String,
    required: 'Password required'
  },
  name: {
    type: String,
    required: 'Name required'
  },
  role: {
    type: String,
    default: 'customer'
  },
  cart: [{
    ProductId: {
      type: ObjectId,
      ref: 'Product'
    },
    amount: {
      type: Number,
    },
    ProductName: String,
    ProductPrice: Number
  }]
}, { timestamps:true,versionKey:false, writeConcern: {
  w: 'majority',
  j: true,
  wtimeout: 1000
}})
  
userSchema.path('email').validate(function(value){
  return User.findOne({ email: value })
  .then(data => {
    if(data) return false
  })
}, 'Email is already registred!')

userSchema.pre('save', function(next){
  this.password = generateHash(this.password)
  next()
})

const User = model('User', userSchema)
module.exports = User