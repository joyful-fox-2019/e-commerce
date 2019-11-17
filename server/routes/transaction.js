const router = require('express').Router()
const TransactionController = require('../controllers/transaction')
const cascadeCarts = require('../middlewares/cascadeCarts')
const updateProductStock = require('../middlewares/updateProductStock')

router.get('/', TransactionController.find)
router.post('/', TransactionController.create, cascadeCarts, updateProductStock)
router.patch('/:id', TransactionController.update)

module.exports = router