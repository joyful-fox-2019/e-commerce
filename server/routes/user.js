const Route = require('express').Router();
const user = require('../controllers/user');
const { authentication } = require('../middlewares/auth');
const images = require('../helpers/images');


Route.post('/signup', user.signup);
Route.post('/signin', user.signin);

Route.use(authentication)

Route.get('/', user.getLogin);

Route.patch('/', user.updateAddress);
Route.patch('/upload',  images.multer.single('image'), images.sendUploadToGCS, user.updateImage);

Route.post('/sendcode', user.sendCodeVerify);
Route.patch('/verify', user.verifyEmail);

module.exports = Route;