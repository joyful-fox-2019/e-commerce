const router = require('express').Router()
const userRouter = require('./userRouter')

router.get('/',(req,res,next)=>{
    res.json({message:'welcome to app'})
})

router.use('/users',userRouter)


module.exports = router