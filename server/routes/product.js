const router = require('express').Router()
const ProductController = require('../controllers/product')

// getAll product
router.get('/', ProductController.getAllProduct);

// create
router.post('/', ProductController.createProduct);

// edit product
router.put('/:id', ProductController.editProduct);

// delete product
router.delete('/:id', ProductController.deleteProduct);

module.exports = router;