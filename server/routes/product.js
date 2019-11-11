const Route = require('express').Router();
const Product = require('../controllers/product');
const { authentication, authorCrudProduct } = require('../middlewares/auth');

Route.get('/', Product.findAllProduct);
Route.get('/:id', Product.findOneProduct);

Route.use(authentication);
Route.post('/', Product.createProduct);


Route.use('/:id', authorCrudProduct);
Route.delete('/:id', Product.deleteProduct);

module.exports = Route;