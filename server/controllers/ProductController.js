const Product = require("../models/product");

class ProductController{
    static findAll (req, res, next) {
        Product.find()
            .then(( products ) => {
                res.status(200).json(results);
            })
            .catch(( err ) => {
                next(err)
            })
    }
    static create(req,res,next){

        let body = {
            name: req.body.name,
            image: req.file ? req.file.cloudStoragePublicUrl : null,
            price: req.body.price,
            stock: req.body.stock
        }
        Product.create(body)
        .then(result=>{
            res.status(201).json(result);
        })
        .catch(( err ) => {
                next(err)
            })
    }
    static delete(req, res, next){
        let id = req.params.productId;

        Product.findByIdAndDelete(id)
            .then(( result ) => {
                if(result){
                    res.status(200).json({
                        message: "Successfully delete the product"
                    })
                } else { 
                    throw new Error("Product id not found")
                }
                
            })
            .catch(( err ) => {
                next(err)
            })
    }
    static update(req, res, next){
        console.log(req.body)
        let updateVal = {}
        let id = req.params.productId;
        // tidak tahu kenapa ini kalo request dari client dia body nya kosong, jadi updatenya gagal terus.  kalo TDD berhasil
        req.body.name && (updateVal.name = req.body.name);
        req.body.price && (updateVal.price = req.body.price);
        req.body.stock && (updateVal.stock = req.body.stock);
        if(req.file !== undefined){
            updateVal.image = req.file.cloudStoragePublicUrl
        }
        Product.findByIdAndUpdate(id,updateVal,{new:true})
            .then(( result ) => {
                res.status(200).json(result);
            })
            .catch(( err ) => {
                next(err)
            })
    }
}

module.exports = ProductController