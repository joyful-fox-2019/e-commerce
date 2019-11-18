const router = require('express').Router()
const CartController = require('../controllers/CartController')
const { authentication } = require('../middleware/auth')
const checkStock = require('../middleware/checkStock')

router.post('/', authentication, checkStock, CartController.updateOrCreate)
router.patch('/removeitem/:id', authentication, CartController.removeItem)
router.patch('/changeqty', authentication, checkStock, CartController.changeQty)
router.get('/', authentication,  CartController.find)

module.exports = router
