const router = require('express').Router()
const transactionController = require('../controllers/transaction')

router.get('/', transactionController.find)
router.get('/:id', transactionController.findOne)
router.post('/', transactionController.create)
router.patch('/:id', transactionController.update)
router.delete('/:id', transactionController.delete)

module.exports = router