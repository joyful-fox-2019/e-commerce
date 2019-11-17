const router = require('express').Router()
const ProductController = require('../controllers/product')
const { authentication, adminAuthorization } = require('../middlewares/auth')
const multer = require('../middlewares/multer')
const gcs = require('../middlewares/gcs')

router.get('/', ProductController.findAll)
router.get('/:id', ProductController.findOne)
router.use(authentication)
router.use(adminAuthorization)
router.post('/', multer.single('image'), gcs, ProductController.addProduct)
router.delete('/:id', adminAuthorization, ProductController.delete)
router.patch('/:id', adminAuthorization, multer.single('image'), gcs, ProductController.updateField)

module.exports = router