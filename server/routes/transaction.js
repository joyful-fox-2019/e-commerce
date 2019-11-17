const router = require('express').Router()
const transactionController = require('../controllers/transaction')
const authenticate = require('../middlewares/authentication')

router.use(authenticate)

// get all transaction
router.get('/', transactionController.getTransaction)

// create transaction
router.post('/', transactionController.createTransaction)

// checkout transaction
router.put('/checkout',transactionController.checkoutTransaction)

// delete transaction
router.delete('/:id', transactionController.deleteTransaction)


module.exports = router