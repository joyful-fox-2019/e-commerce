const router = require('express').Router()
const cartController = require('../controllers/cartController')
const isLogin = require('../middlewares/isLogin')

router.get('/', isLogin, cartController.getOne)
router.patch('/add', isLogin, cartController.addProductToCart)
router.patch('/remove', isLogin, cartController.removeProductInCart)

module.exports = router