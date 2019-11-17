const router = require('express').Router()
const UserRouter = require('./user')
const ProductRouter = require('./product')
const TransactionRouter = require('./transaction')

router.use('/users', UserRouter)

router.use('/products', ProductRouter)

router.use('/transactions', TransactionRouter)


module.exports = router