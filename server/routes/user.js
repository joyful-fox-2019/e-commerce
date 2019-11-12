const router = require('express').Router()
const UserController = require('../controllers/user')

// register
router.post('/register', UserController.register);

//login
router.post('/login', UserController.login);

// get all user
router.get('/', UserController.getUser);


module.exports = router