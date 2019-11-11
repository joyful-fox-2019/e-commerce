const Route = require('express').Router();
const user = require('../controllers/user');
const { authentication } = require('../middlewares/auth');


Route.post('/signup', user.signup);
Route.post('/signin', user.signin);

Route.use(authentication)

Route.get('/', user.getLogin);


Route.patch('/', user.updateAddress);

Route.post('/sendcode', user.sendCodeVerify);
Route.patch('/verify', user.verifyEmail);

module.exports = Route;