const router = require('express').Router()
const userController = require('../controllers/userController')
const isLogin = require('../middlewares/isLogin')

router.post('/register', userController.register)
router.post('/login', userController.login)
// router.get('/profile', isLogin, userController.getOne)

module.exports = router