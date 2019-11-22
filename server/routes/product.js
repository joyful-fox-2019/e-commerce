const router = require('express').Router()
const ProductController = require('../controllers/product')
const Authetincate = require('../middlewares/authenticate')

// getAll product
router.get('/', ProductController.getAllProduct);

// getOne Product
router.get('/:id', ProductController.getProduct)

// create
router.post('/', Authetincate, ProductController.createProduct);

// edit product
router.put('/:id', Authetincate, ProductController.editProduct);

// delete product
router.delete('/:id', Authetincate,ProductController.deleteProduct);

module.exports = router;