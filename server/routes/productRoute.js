const router = require('express').Router()
const ProductController = require('../controllers/productController')
const {authentication, adminAuthorization} = require('../middlewares/authentication')
const gcsUpload = require('gcs-upload')

const upload = gcsUpload({
  limits: {
    fileSize: 5e6 // in bytes
  },
  gcsConfig: {
    keyFilename: process.env.KEYFILE_LOCATION,
    bucketName: process.env.BUCKET_NAME
  }
})

router.get('/', ProductController.getProduct)
router.get('/search', ProductController.search)
router.get('/page/:page', ProductController.getProductPagination)
router.get('/:id', ProductController.getOne)

router.post('/', authentication, adminAuthorization, upload.single('file'), ProductController.createProduct)

module.exports = router