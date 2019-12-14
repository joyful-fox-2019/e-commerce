const router = require('express').Router()
const productController = require('../controllers/product')
const { authentication, adminAuthorization } = require('../middlewares/auth')
const upload = require('../middlewares/upload')

router.get('/', productController.find)
router.get('/:id', productController.findOne)

//khusus admin cuy
router.use(authentication)
router.use(adminAuthorization)

router.post('/', upload.single('imageSource'), productController.create)
router.patch('/:id/gcs', upload.single('imageSource'), productController.update)
router.patch('/:id', productController.update)
router.delete('/:id', productController.delete)

module.exports = router