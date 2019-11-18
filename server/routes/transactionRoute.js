const router = require('express').Router()
const TransactionController = require('../controllers/TransactionController')
const { authentication, authorizationProduct } = require('../middleware/auth')

router.post('/', authentication, TransactionController.create)
router.get('/seller', authentication, TransactionController.getBySeller)
router.get('/', authentication, TransactionController.find)
router.patch('/:id', authentication, authorizationProduct, TransactionController.changeStatus) //:id is PRODUCT ID

module.exports = router
