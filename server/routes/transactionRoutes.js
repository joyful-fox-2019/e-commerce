const router = require('express').Router()
const TransactionController = require('../controllers/TransactionController')
const {authentication, authorizationTransaction, authorizationAdmin} = require('../middlewares/auth')

router.use(authentication)

router.get('/', TransactionController.read)
router.get('/admin', authorizationAdmin, TransactionController.readAdmin)
router.post('/', TransactionController.create)

router.use('/:id', authorizationTransaction)

router.patch('/:id', TransactionController.updateStatus)


module.exports = router