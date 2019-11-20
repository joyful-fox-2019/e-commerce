const router = require('express').Router()
const UserRoutes = require('./user')
const ProductRoutes = require('./product')
const TransactionRoutes = require('./transaction')

router.use('/users', UserRoutes)
router.use('/products', ProductRoutes)
router.use('/transactions', TransactionRoutes)

module.exports = router