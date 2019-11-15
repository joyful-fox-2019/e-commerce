var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({

    fullname : {
        type : String,
        required : [true,'fullname is required'],
    },
    email : {
        type : String,
        unique : true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password : {
        type : String,
        required : [true,'password is required']
    },
    role : {
        type : String,
        required : [true,'position is required'],
        default : 'customer'
    }

})

const User = mongoose.model('User',UserSchema)

UserSchema.path('email').validate((v) => {
    return new Promise((resolve, reject) => {
      User.find()
      .then(data => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].email === v) {
            reject(new Error('email must unique'));
          }
        }
        resolve();
      })
      .catch(err => {
        reject(new Error(err));
      })
    })
  })
  
  module.exports = User;