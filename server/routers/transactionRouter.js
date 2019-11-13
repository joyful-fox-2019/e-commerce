const router = require('express').Router()
const TransactionController = require('../controllers/transactionController')
const { authentication }  = require('../middleware/auth')

router.use(authentication)
router.get('/', TransactionController.allDataTransaction)
router.get('/mytransaction', TransactionController.getUserTransaction)
router.post('/', TransactionController.createTransaction) 
router.patch('/:_id', TransactionController.statusChange)

module.exports = router