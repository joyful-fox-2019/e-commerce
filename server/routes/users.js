const user = require('express').Router()
const {register,login,addCart,removeCart,findOne,topUpMoney,google,github,findAll,myWishlist} = require('../controllers/userController')
const auth = require('../middlewares/auth').authentication

user.get('/my-detail',auth,findOne)
user.get('/mywishlist',auth,myWishlist)
user.get('/',findAll)
user.post('/register',register)
user.post('/login',login)
user.post('/login/google',google)
user.get('/login/github',github)
user.post('/add-cart',auth,addCart)
user.patch('/remove-item',auth,removeCart)
user.patch('/topup',auth,topUpMoney)

module.exports = user