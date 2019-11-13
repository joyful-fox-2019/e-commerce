const Product = require('../models/Product')
const { deleteFile } = require('../middlewares/images')

class ProductController {
    static readOne (req,res,next) {
        let { id } = req.params
        Product.findById(id)
            .then(data=>{
                res.json(data)
            })
            .catch(next)
    }
    static read(req,res,next){
        let { tag } = req.query
        let objParams = {}
        if (tag) {
            objParams.tags = tag
        }
        Product.find(objParams)
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(next)
    }
    static create(req,res,next) {
        let {name,desc,price,stock} = req.body
        let tags = req.body.tags.split(',')
        let image = req.file
        Product.create({
            name,
            desc,
            price,
            stock,
            image:image.cloudStoragePublicUrl,
            tags
        })
        .then(data=>{
            res.status(201).json(data)
        })
        .catch(next)
    }
    static update(req,res,next) {
        let {name,desc,price,stock} = req.body
        let tags = req.body.tags.split(',')
        let image = req.file
        let {id} = req.params
        Product.findById(id)
            .then(data=>{
                if(image) {
                    deleteFile(data.image)
                    
                    return Product.updateOne({_id:id},{
                        name,desc,price,stock,image:image.cloudStoragePublicUrl,tags
                    })
                } else {
                    return Product.updateOne({_id:id},{
                        name,desc,price,stock,tags
                    })
                }
            })
        .then(_ =>{
            res.status(200).json(({message:'update success'}))
        })
        .catch(next)
    }
    static delete(req,res,next) {
        let {id} = req.params
        Product.findByIdAndDelete(id)
        .then(data=>{
            deleteFile(data.image)
            res.status(200).json(({message:'delete success'}))
        })
        .catch(next)
    }
}

module.exports = ProductController