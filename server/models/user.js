const mongoose = require('mongoose')
const Schema  = mongoose.Schema;
const bcrytpjs = require("../helpers/bcryptjs.js");

let userSchema = new Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true,
        validate: function (val) {
            var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{1,4})?$/;
            return emailRegex.test(val)
    }
    },
    password: {
        type: String,
        required:true
    },
    imageUrl: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfFExj43vNWFXXhr4_S6vYSGqFzjC77uObABaR7mk1biI9Y4eK"
    },
    accountType: {
        type: String,
        default: "default"
    },
    role: {
        type: String,
        default: "customer",
        required: true
    },
    balance: {
        type: Number,
        min: 0
    }
},{timestamps: true})

userSchema.pre("save", function(next){
    this.password = encryption.getHashedPassword(this.password)
    next()
})

userSchema.path('email').validate(async (value) => {
    let user =  await mongoose.models.User.findOne({email:value});
    return !user;
}, 'Email already registered');

const User = mongoose.model("User", userSchema);

module.exports = User