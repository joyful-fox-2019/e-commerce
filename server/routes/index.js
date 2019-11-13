const router = require('express').Router()
const userRoute = require('./userRoute')
const productRoute = require('./productRoute')
const transactionsRoute = require('./transactionRoute')

router.use('/users', userRoute)
router.use('/products', productRoute)
router.use('/transactions', transactionsRoute)

module.exports = router