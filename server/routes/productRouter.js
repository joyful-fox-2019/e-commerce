const router = require('express').Router()
const { authenticate, authorize } = require('../middlewares/auth')
const productController = require('../contollers/productController')
const upload = require('../middlewares/googleUpload')


router.get('/', productController.findAll)
router.post('/', authenticate, upload.single('image'), productController.create)
router.get('/:id', productController.findOne)
router.put('/:id', authenticate, authorize, productController.update)
router.delete('/:id', authenticate, authorize, productController.delete)

module.exports = router