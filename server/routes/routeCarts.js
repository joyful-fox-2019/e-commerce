const router = require('express').Router()
const ControllerCart = require('../controllers/cart')
const authenticate = require('../middlewares/authenticate')

router.get('/', authenticate, ControllerCart.fetchOne)

router.post('/:productId/:qty', authenticate, ControllerCart.addOrUpdateQtyInCart)

router.patch('/:product_id/:qty', authenticate, ControllerCart.updateProductQtyInCart)

module.exports = router