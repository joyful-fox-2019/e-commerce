const router = require('express').Router()
const usersRouter = require('./users')
const productsRouter = require('./products')

router.get('/', (req, res, next) => {
  res.status(200).json({ hello: 'omniverse' })
})

router.use('/users', usersRouter)
router.use('/products', productsRouter)

module.exports = router