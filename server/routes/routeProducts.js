const gcsUpload = require('gcs-upload')
const router = require('express').Router()
const ControllerProduct = require('../controllers/product')
const authorizeAdmin = require('../middlewares/authorizeAdmin')
const authenticate = require('../middlewares/authenticate')

const upload = gcsUpload({
  limits: {
    fileSize: 1e6 // in bytes
  },
  gcsConfig: {
    keyFilename: process.env.GOOGLE_KEY_FILE,
    bucketName: process.env.GOOGLE_PROJECT_ID
  }
})

router.post('/upload-image', authenticate, upload.single('image'), (req, res, next) => {
  try {
    res.status(200).send(req.body.image)
  }
  catch(err) { next(err) }
})

router.get('/', ControllerProduct.fetchAll)

router.post('/', authenticate, authorizeAdmin, ControllerProduct.add)

router.get('/:id', ControllerProduct.fetchOne)

router.patch('/:id', authorizeAdmin, ControllerProduct.update)

router.delete('/:id', authorizeAdmin, ControllerProduct.delete)

module.exports = router
