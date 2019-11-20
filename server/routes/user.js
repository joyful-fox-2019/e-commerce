const router = require('express').Router();
const User = require('../controllers/userController');
const verify = require('../middleware/googleVerify');

router.post('/signup', User.register);
router.post('/signin', User.login);
router.patch('/addrps/:email', User.addRps);
router.get('/getrps/:email', User.getRps);
router.post('/googleLogin', verify, User.googleLogin);

module.exports = router