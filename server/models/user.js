const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')
const {hashPassword} = require('../helpers/hash')

const UserSchema = new Schema({
    username : {type : String, required : [true, 'username is required'], unique : true},
    email : {type : String, required : [true, 'email is required'], unique : true},
    password : {type : String, required : [true, 'password is required'], minlength : [6, 'less than 6 characters']},
    role : {type : String, required : [true, 'role is required']},
    ProductsId : [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    balance : {type : Number, default : 0}
},{versionKey : false})

UserSchema.plugin(uniqueValidator)

UserSchema.pre('save', function(next){
    this.password = hashPassword(this.password)
    next()
})

UserSchema.path('email').validate(function (email) {
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(email);
 }, 'format email wrong')


UserSchema.path('password').validate(function (password) {
   var passwordRegex =  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/;
   return passwordRegex.test(password);
}, 'password must a mixed of number and letters')

const User = mongoose.model('User', UserSchema)

module.exports = User