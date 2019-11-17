const router = require('express').Router()
const routeProducts = require('./routeProducts')
const routeUsers = require('./routeUsers')
const routeCarts = require('./routeCarts')

router.use('/products', routeProducts)
router.use('/users', routeUsers)
router.use('/carts', routeCarts)

module.exports = router