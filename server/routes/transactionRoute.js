const router = require('express').Router()
const TransactionController = require('../controllers/transactionController')
const {authentication, transactionAuthentication, adminAuthorization} = require('../middlewares/authentication')

router.use(authentication)

router.get('/', TransactionController.getTransaction)
router.get('/admin', adminAuthorization, TransactionController.adminFindAll)
router.get('/admin/:user_id', adminAuthorization, TransactionController.adminFind)

router.post('/', TransactionController.createTransaction)
 
router.patch('/:id', authentication, transactionAuthentication, TransactionController.transactionDone)

module.exports = router