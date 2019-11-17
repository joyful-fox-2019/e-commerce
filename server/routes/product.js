const router = require('express').Router()
const ProductController = require('../controllers/product')
const { authentication, adminAuth } = require('../middlewares/auth')
const multer = require('../middlewares/multer')
const gcs = require('../middlewares/gcs')

router.get('/', ProductController.findAll)
router.get('/search', ProductController.searchProduct)
router.get('/:id', ProductController.findOne)

router.use(authentication, adminAuth)
router.post('/add', multer.single('image'), gcs, ProductController.addProduct)
router.patch('/:id/edit', ProductController.editProduct)
router.delete('/:id/delete', ProductController.delete)

module.exports = router