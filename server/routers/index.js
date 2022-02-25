const router = require('express').Router()
const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const cartRouter = require('./cartRouter')
const transactionsRouter = require('./transactionRouter')

router.get('/', (req,res) => {
  res.status(200).json({ message:"Connected" })
})

router.use('/users', userRouter)
router.use('/products', productRouter)
router.use('/carts', cartRouter)
router.use('/transactions', transactionsRouter)

module.exports = router