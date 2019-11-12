const Transaction = require('../models/transaction');
const Product = require('../models/product');
const { checkout } = require('../controllers/cart');


function updateProduct(data) {
  // console.log('ini dalam function updateProduct')
  // console.log(data)
  return new Promise ((resolve, reject) => {
    Product.findById(data.id)
      .then(product => {
        // console.log('dalam prmise')
        // console.log(product)
        product.stock = Number(product.stock) - Number(data.count)
        return Product.findByIdAndUpdate(data.id, {stock: product.stock}, {new: true})
      })
      .then(product => {
        console.log(product)
        resolve(product);
      })
      .catch(reject)
  })
}
module.exports = {
  createTransaction (req, res, next) {
    const Cart = req.CartId;
    console.log(Cart)
    let totalPayment = 0
    let tempProductId = []
    Cart.product.forEach((el, i) => {
      console.log('looping cart')
      console.log(el)
      tempProductId.push({id: el.id, count: el.count})
      totalPayment += Number(el.price) * Number(el.count)
    })
    
    // prosses pengurangan stock
    
    let tempUpdateProduct = []
    tempProductId.forEach((el, i) => {
      updateProduct(el)
      .then(data => {
        // console.log('ini dalam looping')
        // console.log(data)
        tempUpdateProduct.push(data)
      })
      .catch(next)
    })
    
    // prosess membuat transaction
    let tempTrasaction
    setTimeout(() => {
      if(tempUpdateProduct.length == 0) next({msg: 404, msg: 'no have Cart'})
      else {
        setTimeout(() => {
          Transaction.create({ CartId: Cart._id, payment: totalPayment })
            .then(transaction => {
              tempTrasaction = transaction
              return checkout(req.loggedUser.id)
            })
            .then(() => {
              res.status(201).json({transaction: tempTrasaction, product: tempUpdateProduct})
            })
            .catch(next)
        }, 5000);
      }
    }, 1000);
  }
}