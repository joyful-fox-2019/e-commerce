const router = require('express').Router()
const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const cartRouter = require('./cartRouter')
const transactionRouter = require('./transactionRouter')

router.get('/',(req,res,next)=>{
    res.json({message:'welcome to e-commerce'})
})

router.use('/users',userRouter)
router.use('/products',productRouter)
router.use('/carts',cartRouter)
router.use('/transactions',transactionRouter)

module.exports = router