const router = require('express').Router()

const userRouter = require('./user')
const productRouter = require('./products')

router.get('/', (req, res, next) =>{
  res.status(200).json({ hello : `world`})
})

router.use('/users', userRouter)
router.use('/products', productRouter)

module.exports = router
