const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const upload = require('../helpers/gcsUpload')
const { authentication, authorizationProduct } = require('../middleware/auth')

router.post('/', authentication, upload.single('file'), ProductController.create)
router.post('/test', authentication, ProductController.create)
router.get('/', ProductController.find)
router.get('/search', ProductController.search)
router.get('/seller', authentication, ProductController.findSellerProduct)
router.get('/:id', ProductController.findOne)
router.patch('/:id', authentication, authorizationProduct, upload.single('file'), ProductController.update)
router.patch('/:id/test', authentication, authorizationProduct, ProductController.update)
router.delete('/:id', authentication, authorizationProduct, ProductController.delete)

module.exports = router
