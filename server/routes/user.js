const router = require('express').Router()
const userController = require('../controllers/user')

router.post('/register', userController.register)
router.get('/verify', userController.verify)
router.post('/login', userController.login)

module.exports = router