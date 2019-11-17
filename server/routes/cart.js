const router = require('express').Router()
const CartController = require('../controllers/cart')
const { authentication, custAuth, cartAuth } = require('../middlewares/auth')

router.use(authentication, custAuth)
router.get('/', CartController.showCart)
router.post('/:idProduct/add-to-cart', CartController.addToCart)
router.patch('/:idCart/update', cartAuth, CartController.updateQty)
router.delete('/:idCart/delete',cartAuth ,CartController.deleteCart)

module.exports = router