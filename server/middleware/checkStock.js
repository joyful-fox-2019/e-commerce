const Product = require('../models/Product')

function checkStock(req, res, next) {
    const { productId, qty} = req.body
    if(!productId || !qty) res.status(400).json({ message: 'bad request' })
    else{
        Product.findById(productId)
        .then(product =>{
            if(product){
                if(Number(qty) > product.stock){
                    next({
                        status: 400,
                        msg: 'out of stock'
                    })
                }
                else {
                    next()
                }
            } else {
                next({
                    status: 404,
                    msg: 'product not found'
                })
            }
        })
        .catch(next)
    }
}
module.exports = checkStock