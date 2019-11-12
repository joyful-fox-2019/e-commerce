const router = require('express').Router()
const productController = require('../controllers/product')

router.get('/', productController.find)
router.get('/:id', productController.findOne)
router.post('/', productController.create)
router.patch('/:id', productController.update)
router.delete('/:id', productController.delete)

module.exports = router