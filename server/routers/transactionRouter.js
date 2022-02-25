const router = require('express').Router()
const TransactionController = require('../controllers/transactionController')
const { authentication }  = require('../middleware/auth')

router.use(authentication)
router.get('/mytransaction', TransactionController.getUserTransaction)
router.get('/', TransactionController.allDataTransaction)
router.post('/', TransactionController.createTransaction) 
router.patch('/:_id', TransactionController.statusChange)

module.exports = router