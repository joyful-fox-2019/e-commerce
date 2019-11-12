const router = require('express').Router()
const userRoute = require('./user')
const transactionRoute = require('./transaction')
const productRoute = require('./product')


router.get('/', (req, res, next) => {
  res.json({
    message: 'Welcome to bikeshop'
  })
})

router.use('/users', userRoute)

module.exports = router