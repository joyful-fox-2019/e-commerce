const router = require('express').Router()
const productController = require('../controllers/product')
const { authentication, adminAuthorization } = require('../middlewares/auth')

router.get('/', productController.find)
router.get('/:id', productController.findOne)

//khusus admin cuy
router.use(authentication)
router.use(adminAuthorization)
router.post('/', productController.create)
router.patch('/:id', productController.update)
router.delete('/:id', productController.delete)

module.exports = router