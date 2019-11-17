const routes = require('express').Router()
const userRoutes = require('./user')
const productRoutes = require('./product')
const cartRoutes = require('./cart')

routes.get('/',(req,res,next)=>{
    res.status(200).json('connect to server OK!')
})

routes.use('/user',userRoutes)
routes.use('/product',productRoutes)
routes.use('/cart',cartRoutes)

module.exports = routes