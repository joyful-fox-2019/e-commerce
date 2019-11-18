const router = require('express').Router()
const ControllerUser = require('../controllers/user')
const authenticate = require('../middlewares/authenticate')

router.post('/register', ControllerUser.register)

router.post('/login', ControllerUser.login)

router.post('/googleSignIn', ControllerUser.googleSignIn)

router.get('/user', authenticate, ControllerUser.findById)

// router.post('/addToCart', authenticate, ControllerUser.addToCart)

module.exports = router