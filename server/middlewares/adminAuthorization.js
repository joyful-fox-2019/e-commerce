const Product = require('../models/product');

function authorization(req,res,next){
    Product.findOne({
        _id: req.params.id
    })
    .then(product => {
        if(product){
            if(product.adminId === req.user.id){
                next()
            }else{
                throw ({ code: 403, message: 'You dont have permission'})
            }
        }
    })
    .catch(err => {
        next(err)
    })
}

module.exports = authorization