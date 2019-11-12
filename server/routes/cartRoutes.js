const router = require('express').Router()
const cartController = require('../controllers/cartController')
const isLogin = require('../middlewares/isLogin')

router.get('/', isLogin, cartController.getOne)
router.patch('/:id', cartController.addProductToCart)
router.patch('/:id', cartController.removeProductInCart)

module.exports = router