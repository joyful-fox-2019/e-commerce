const router = require('express').Router()
const UserController = require('../controllers/userController')

router.post('/register', UserController.signup)
router.post('/login', UserController.login)

module.exports = router