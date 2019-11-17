const router = require('express').Router()
const users = require('./users')
const products = require('./products')
const transactions = require('./transactions')

router.use('/users',users)
router.use('/products',products)
router.use('/transactions',transactions)


module.exports = router