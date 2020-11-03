const router = require('express').Router()
const authenticate = require('../middlewares/authentication')
const authorize = require('../middlewares/authorization')
const productController = require('../controllers/product')
const images = require('../helpers/uploadimage')


// read all product
router.get('/', productController.showAllProduct)

router.use(authenticate)
router.use(authorize)
// create product ===> admin only
router.post('/', images.multer.single('image'), images.sendUploadToGCS, productController.createProduct)

// update product ===> admin only
router.put('/:id', images.multer.single('image'), images.sendUploadToGCS, productController.updateProduct)

// delete product ===> admin only
router.delete('/:id', productController.deleteProduct)


module.exports = router