const router = require('express').Router()
const ProductController = require('../controllers/product')
const { authenticate, isAdmin } = require('../middlewares/auth')

const gcsUpload = require('../middlewares/gcs')

const upload = gcsUpload({
  limits: {
    fileSize: 2e6
  },
  gcsConfig: {
    keyFilename: process.env.KEYFILE_PATH,
    bucketName: process.env.BUCKET_NAME
  }
})

router.get('/', ProductController.findAll)
router.post('/', authenticate, isAdmin, upload.single('image') ,ProductController.create)
router.patch('/fav/:id',authenticate, ProductController.favorite)
router.get('/:id', ProductController.findById )
router.patch('/:id', authenticate, isAdmin, upload.single('image'), ProductController.update)
router.delete('/:id', authenticate, isAdmin, ProductController.remove)

module.exports = router