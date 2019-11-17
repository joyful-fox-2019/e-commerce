const router = require('express').Router()
const TransactionController = require('../controllers/transaction')
const cascadeCarts = require('../middlewares/cascadeCarts')
const updateProductStock = require('../middlewares/updateProductStock')

router.get('/', TransactionController.find)
router.get('/:id', TransactionController.findOne)
router.post('/', TransactionController.create, cascadeCarts, updateProductStock)
router.patch('/:id', TransactionController.update)

module.exports = router