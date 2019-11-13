const router = require('express').Router()
    , TransactionController = require('../controllers/TransactionController')
    , {authentication,adminAuthorization} = require('../middlewares/auth')

router.use(authentication)
router.get('/',adminAuthorization,TransactionController.history)
// for customer
router.get('/customer',TransactionController.getTransaction)
router.patch('/',TransactionController.checkout)
router.patch('/:id',TransactionController.delivered)

module.exports = router