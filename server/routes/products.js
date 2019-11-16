const router = require('express').Router()
const ProductController = require('../controllers/product')
const { authentication, adminAuthorization } = require('../middlewares/auth')
const upload = require('../middlewares/upload')

router.get('/', ProductController.find)
router.get('/:id', ProductController.findOne)
router.use(authentication)
router.post('/', adminAuthorization, upload.single('image'), ProductController.create)
router.patch('/:id', adminAuthorization, ProductController.update)

module.exports = router