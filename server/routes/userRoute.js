const router = require('express').Router()
const UserController = require('../controllers/user')
const { authentication, authorization } = require('../middlewares/auth')



router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.patch('/cart', authentication, UserController.addToCart)
router.delete('/cart/:id', authentication, UserController.removeFromCart)
router.get('/cart', authentication, UserController.viewCart)
// router.post('/googleLogin', UserController.googleLogin)

module.exports = router