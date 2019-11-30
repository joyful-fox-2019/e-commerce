const router = require('express').Router()
const CartController = require('../controllers/cartController')
const { authentication } = require('../middleware/auth')

router.use(authentication)
router.get('/', CartController.getCart)
router.patch('/addToCart/:ProductId', CartController.addToCart)
router.patch('/updateAmount/:ProductId/:amount', CartController.updateAmount)
router.patch('/deleteProductFromCart/:CartId', CartController.deleteProductFromCart)

module.exports = router