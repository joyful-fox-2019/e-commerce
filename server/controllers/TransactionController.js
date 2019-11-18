const Transaction = require("../models/transaction");

class TransactionController{
    static findAll(req,res,next){
        let userId = req.params.user._id;

        let where = {}
        if(req.params.user.role === "customer"){
            
            where.userId = userId
        }console.log(where)
        Transaction.find(where)
        .then(results=>{
            console.log("role customer")
            console.log(results)
            res.status(200).json(results);
        })
        .catch(error=>{
            next(error)
        })
    }
    static create(req,res,next){
        
        let body = {
            userId: req.params.user._id,
            carts: req.body.carts,
            total: req.body.total,
            username: req.params.user.name,
            status: req.body.status
        }
        Transaction.create(body)
        .then(result=>{
            res.status(201).json(result);
        })
        .catch(error=>{
            next(error)
        })
    }
   
    static update(req,res, next){
        let updateVal = {}
        let id = req.params.transactionId;
        req.body.status && (updateVal.status = req.body.status);

        Transaction.findByIdAndUpdate(id,updateVal,{new:true})
        .then(result=>{
            res.status(200).json(result);
        })
        .catch(err=>{
            next(err)
        })
    }
}
module.exports = TransactionController;