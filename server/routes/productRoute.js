const router = require('express').Router()
const ProductController = require('../controllers/product')
const { authentication, authorization } = require('../middlewares/auth')
const multer = require('../middlewares/multer')
const gcs = require('../middlewares/gcs')

router.get('/', ProductController.findAll)
router.get('/:id', ProductController.findOne)
router.use(authentication)
// router.use(authorization)
router.post('/', multer.single('image'), gcs, ProductController.addProduct)
router.delete('/:id', authorization, ProductController.delete)
router.patch('/:id', authorization, multer.single('image'), gcs, ProductController.updateField)

module.exports = router