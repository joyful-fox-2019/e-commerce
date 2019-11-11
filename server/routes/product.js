const router = require('express').Router()
const authenticate = require('../middlewares/authentication')
const authorize = require('../middlewares/authorization')
const productController = require('../controllers/product')
const images = require('../helpers/uploadimage')

router.get('/', productController.showAllProduct)

router.post('/', images.multer.single('image'), images.sendUploadToGCS, authenticate, productController.createProduct)

router.put('/:id', images.multer.single('image'), images.sendUploadToGCS, authenticate, authorize, productController.updateProduct)

router.delete('/:id', authenticate, authorize, productController.deleteProduct)


module.exports = router