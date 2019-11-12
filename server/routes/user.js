const router = require('express').Router()
const UserController = require('../controllers/userCon')

router.post('/signup', UserController.register)
router.post('/signin', UserController.login)

module.exports = router