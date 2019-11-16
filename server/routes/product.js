const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const { authentication, adminAuthorization, authorization } = require('../middlewares/auth')
const multer = require('../middlewares/multer')
const gcs = require('../middlewares/gcs')

router.get('/', ProductController.readAll)
router.use(authentication)
router.get('/:id', ProductController.readOne)

router.use(adminAuthorization)
router.post('/', multer.single('image'), gcs, ProductController.create)
router.put('/:id', authorization, ProductController.updateField)
router.delete('/:id', authorization, ProductController.deleteProduct)

module.exports = router