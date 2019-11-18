const Product = require('../models/product')

module.exports = (req,res,next) => {
    
    Product.findOne({_id: req.params.productId})
        .then(function (product) {
            if (product.userId === req.decoded.payload.id) {
                next()
            }else {
                next({status: 403,message: 'You dont have have authorize to do that'})
            }
        })
        .catch(next)
 
}