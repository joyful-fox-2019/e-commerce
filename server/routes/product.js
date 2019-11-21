const Route = require('express').Router();
const Product = require('../controllers/product');
const { authentication, authorCrudProduct } = require('../middlewares/auth');
const images = require('../helpers/images')

Route.get('/', Product.findAllProduct);
Route.get('/category', Product.findAllCategory);
Route.get('/category/:name', Product.findByCategoryName);
Route.get('/:id', Product.findOneProduct);

Route.use(authentication);
Route.post('/',  images.multer.single('image'), images.sendUploadToGCS, Product.createProduct);

Route.patch('/wish/:id', Product.addToWishList);
Route.patch('/wish/remove/:id', Product.removeWishList)

Route.put('/:id', images.multer.single('image'), images.sendUploadToGCS, authorCrudProduct, Product.updateProduct);
Route.delete('/:id', authorCrudProduct, Product.deleteProduct);

module.exports = Route;