const router = require('express').Router()
const TransactionController = require('../controllers/transaction')
const { authentication, transactionAuth } = require('../middlewares/auth')

router.use(authentication)
router.post('/checkout', TransactionController.checkout)
router.get('/', TransactionController.getTransaction)
router.get('/adm', TransactionController.getTransactionAdm)
router.patch('/:id/update', TransactionController.updateStatus)

router.use(':id', transactionAuth)
router.delete('/:id/delete', TransactionController.deleteTransaction)

module.exports = router 