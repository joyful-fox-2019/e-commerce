`use strict`
const router = require('express').Router()
const userController = require('../contollers/userController')
const loginGoogle = require('../middlewares/googleLogin')
const { authenticate } = require('../middlewares/auth')


router.post('/register',userController.register)
router.post('/login',userController.login)
router.post('/login-google', loginGoogle, userController.loginGoogle)
router.post('/login-facebook', userController.loginFacebook)
router.get('/user', authenticate, userController.findOne)

module.exports = router

