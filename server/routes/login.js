const router = require('express').Router()
const userController = require('../controllers/user')

router.post('/', userController.login)

module.exports = router