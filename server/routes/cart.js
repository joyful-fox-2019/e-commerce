const Route = require('express').Router();
const CartController = require('../controllers/cart');
const { authentication } = require('../middlewares/auth');

Route.use(authentication);


Route.get('/', CartController.getCart)
Route.patch('/', CartController.addToCart);


Route.patch('/', CartController.checkout);

module.exports = Route;