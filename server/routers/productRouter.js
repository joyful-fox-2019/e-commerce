const router = require('express').Router()
const ProductController = require('../controllers/productController')
const gcsUpload = require('../middleware/upload')
const { authentication,authorization } = require('../middleware/auth')

const upload = gcsUpload({
  limits: {
    fileSize: 1e6
  },
  gcsConfig: {
    keyFilename: './keyapi.json',
    bucketName: 'dipaecommerce'
  }
})

router.get('/', ProductController.findAll)
router.get('/search', ProductController.searchProduct)
router.get('/detail/:_id', ProductController.findDetail)
router.use(authentication, authorization)
router.post('/', upload.single('imgUrl'), ProductController.createProduct)
router.patch('/:_id', upload.single('imgUrl'),ProductController.editProduct)
router.delete('/:_id', ProductController.deleteProduct)

module.exports = router