const router = require('express').Router()
const transactionController = require('../controllers/transactions')
const {authentication} = require('../middlewares/auth')

router.use(authentication)
router.get('/', transactionController.confirmTransaction)
router.get('/purchased', transactionController.purchasedTransaction)
router.get('/sold', transactionController.soldTransaction)
router.post('/', transactionController.createTransaction)
router.patch('/:id', transactionController.statusTransaction)

module.exports = router