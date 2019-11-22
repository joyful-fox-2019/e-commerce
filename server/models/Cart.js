const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Products = require("./Product")

const CartSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: "Products"
    },
    BuyerId: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    },
    countProduct: {
        type: Number,
        min: [1, "At least must be 1"]
    },
    price: {
        type: Number
    }
}, {
    versionKey: false
})

CartSchema.pre("save", function(next) {
    Products.findOne({
        _id: this.product._id
    })
    .then (result => {
        if(result.stock >= this.countProduct){
            this.price = this.countProduct * result.price
            next()
        } else {
            let err = new Error("Stok Tidak Mencukupi")
            err.name = "StockFailed"
            next(err)
        }
    })
    .catch (err => {
        next(err)
    })
})

const Cart = mongoose.model("Carts", CartSchema)


module.exports = Cart