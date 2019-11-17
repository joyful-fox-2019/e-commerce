const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const {getHash} = require('../helpers/bcrypt')
const Schema = mongoose.Schema


const users = new Schema({
  username : {
    type : String,
    required : [true,'Username is required']
  },
  email : {
    type : String,
    required : [true,'Email is required'],
    match : [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,'Email format is invalid'],
    unique : true
  },
  password : {
    type : String,
    required : [true,'Password is required']
  },
  admin : {
    type : Boolean,
    default : false
  },
  cart : [{ 
    product : {type : Schema.Types.ObjectId, ref : 'Product'},
    qty : {type : Number}
  }],
  loginWith : {
    type : String,
    default : 'web'
  },
  money : {
    type : Number,
    min : [0,'User money minimal 0'],
    max : [10000000, 'User money maximal 10000000'],
    default: 0
  },
  wishlist : [{
    type : Schema.Types.ObjectId,
    ref : 'Product'
  }]

},{
  versionKey : false
})

users.pre('save',function(next){
  this.password = getHash(this.password)
  next()
})

const User = mongoose.model('User',users)


users.plugin(uniqueValidator, { message: '{PATH} already in use' });


module.exports = User