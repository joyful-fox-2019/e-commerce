const router = require('express').Router()
const UserController = require('../controllers/UserController')
const { authentication } = require('../middlewares/auth')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.patch('/cart', authentication, UserController.addToCart)
router.patch('/cart/remove', authentication, UserController.removeFromCart)

module.exports = router