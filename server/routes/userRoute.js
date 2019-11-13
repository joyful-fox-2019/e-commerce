const router = require('express').Router()
const UserController = require('../controllers/userController')
const {authentication} = require('../middlewares/authentication')

router.get('/', authentication, UserController.getUser)

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.patch('/cart', authentication, UserController.addCart)
router.patch('/cart/subtract', authentication, UserController.subtractCart)

router.delete('/cart', authentication, UserController.removeCart)

module.exports = router