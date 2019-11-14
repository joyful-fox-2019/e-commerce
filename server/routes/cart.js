const Route = require('express').Router();
const CartController = require('../controllers/cart');
const { authentication } = require('../middlewares/auth');

Route.use(authentication);


Route.get('/', CartController.getCart)
Route.post('/', CartController.addToCart);

Route.put('/:name', CartController.removeCart);
Route.patch('/', CartController.checkout);


module.exports = Route;