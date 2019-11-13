const router = require('express').Router()
const cartController = require('../controllers/cart')
const { authentication, customerAuthorization } = require('../middlewares/auth')

router.get('/', cartController.find)
router.get('/:id', cartController.findOne)
router.use(authentication)
router.use(customerAuthorization)
router.post('/', cartController.create)
router.patch('/:id', cartController.update)
router.delete('/:id', cartController.delete)

module.exports = router