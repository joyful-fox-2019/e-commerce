const router = require('express').Router()
const transactionController = require('../controllers/transaction')
const { authentication, customerAuthorization, adminAuthorization } = require('../middlewares/auth')

router.use(authentication)
router.get('/', transactionController.find)
router.get('/:id', transactionController.findOne)

router.post('/', transactionController.create)

router.patch('/:id', transactionController.update)
router.delete('/:id', transactionController.delete)

module.exports = router