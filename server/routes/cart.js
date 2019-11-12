const router = require('express').Router()
const CartController = require('../controllers/cartCon')
const { authentication, authCustomer, authAdmin, authorization} = require('../middlewares/auth')

router.get('/', authAdmin, CartController.showAll)
router.get('/user', CartController.showAllUserCart)
router.get('/user/history', CartController.showAllHistoryUserCart)
router.get('/user/pending', CartController.showAllPendingUserCart)
router.post('/:id', CartController.create) //itemId
router.put('/:id', authorization, CartController.update) //cartId
router.delete('/:id', authorization, CartController.delete) //cartId

module.exports = router
