const { Schema, model} = require('mongoose');
const { hashPassword } = require('../helpers/hash');


const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'username is required!']
  },
  email: {
    type: String,
    required: [true, 'email is required!'],
    validate: {
      validator: function(v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: "Email invalid format"
    },
    unique: true
  },
  password: {
    type: String,
    required: [true, 'password is required!'],
    minlength: [6, 'password min 6 char!']
  },
  WishList: [
    {
      type: Schema.Types.ObjectId,
      ref: 'products'
    }
  ],
  History: [
    {
      type: Schema.Types.ObjectId,
      ref: 'transactions'
    }
  ],
  verification: Boolean,
  profile_image: String,
  address: [
    {
      type: String
    }
  ],
  role: String,
  StoreId: {
    type: Schema.Types.ObjectId,
    ref: 'stores'
  }
})

function randomImage () {
  let image = [
    'https://i.pinimg.com/originals/04/c7/8a/04c78a3bec46babab4a23e3e13091552.jpg',
    'https://i.pinimg.com/564x/d6/7f/cb/d67fcb293e7ab5d6fdd92cb9bc639b3b.jpg'
  ]
  let random = Math.floor(Math.random() * image.length)
  let result = image[random];
  return result
}

UserSchema.path('email').validate(function () {
  return User.findOne({ email: this.email })
    .then(user => {
      if(user) return false
    })
}, 'Email user is already registered!')

UserSchema.pre('save', function (next) {
  this.History = [];
  this.verification = false;
  this.address = '';
  this.role = 'customer';
  this.profile_image = randomImage();
  this.password = hashPassword(this.password);
  this.WishList = [];
  this.FavoriteStore = [];
  this.StoreId = null;
  next()
})

const User = model('users', UserSchema)

module.exports = User;