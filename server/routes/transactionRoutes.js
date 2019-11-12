const router = require('express').Router()
const transactionController = require('../controllers/transactionController')

router.get('/', transactionController.getAll)
router.post('/', transactionController.checkOut)

module.exports = router