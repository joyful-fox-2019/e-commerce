const router = require('express').Router()
const TransactionController = require('../controllers/transaction')
const UserController = require('../controllers/user')
const { authenticate, trxAuthorization} = require('../middlewares/auth')

router.use(authenticate)
router.get('/', TransactionController.find)
router.post('/', TransactionController.create, UserController.checkout)
router.get('/:id', trxAuthorization, TransactionController.findById)
router.patch('/:id', trxAuthorization, TransactionController.update)

module.exports = router
