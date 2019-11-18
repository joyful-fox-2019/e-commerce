const router = require('express').Router();
const User = require('../controllers/userController');
const verify = require('../middleware/googleVerify');

router.post('/signup', User.register);
router.post('/signin', User.login);
router.post('/googleLogin', verify, User.googleLogin);

module.exports = router