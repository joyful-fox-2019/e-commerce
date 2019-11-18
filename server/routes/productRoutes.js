const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const {authentication, authorizationAdmin} = require('../middlewares/auth')
const gcsUpload = require('gcs-upload')

const upload = gcsUpload({
  limits: {
    fileSize: 1e6 // in bytes
  },
  gcsConfig: {
    keyFilename: process.env.GOOGLE_CLOUD_KEY_FILE,
    bucketName: process.env.CLOUD_BUCKET
  }
})

router.get('/', ProductController.read)

router.use(authentication)

router.get('/:id', ProductController.readOne)

router.use(authorizationAdmin)

router.post('/', upload.array('imgUrl'), ProductController.create)
router.put('/:id', upload.array('imgUrl'), ProductController.update)
router.delete('/:id', ProductController.delete)


module.exports = router