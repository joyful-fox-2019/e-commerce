const router = require('express').Router()
const CartController = require('../controllers/cart')
const { cartAuthorization } = require('../middlewares/auth')

router.get('/', CartController.find)
router.post('/', CartController.create)
router.use('/:id', cartAuthorization)
router.patch('/:id', CartController.update)
router.delete('/:id', CartController.delete)

module.exports = router