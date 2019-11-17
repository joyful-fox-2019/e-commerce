const User = require('../models/User')
const Product = require('../models/Product')
const Cart = require('../models/Cart')

class ControllerCart {
  static fetchOne(req, res, next) {
    // console.log("ini userId", req.user)
    const userId = req.user.id

    Cart
      .findOne({ userId })
      .populate('products.productId')
      .then(cart => {
        // console.log('ini cart dari fetchOne', cart);
        res.status(200).json({ cart })
      })
      .catch(next)
  }

  static addOrUpdateQtyInCart(req, res, next) {
    const { productId, qty } = req.params
    const userId = req.user.id
    // console.log("ini user", req.user.id);
    // console.log('ini productId', productId);
    Product
      .findOne({ _id: productId })
      .then(product => {
        // console.log('ini product dari hasil POST /carts', product);
        if (!product) throw {
          name: 'NotFound',
          status: 404,
          message: 'Product not found!'
        }
        else if (product.qty < qty) throw {
          name: 'ExceededStock',
          status: 400,
          message: 'The quantity of products you requested exceeded our stock!'
        }
        return Cart.findOne({ userId })
      })
      .then(cart => {
        if (!cart) {
          return Cart
            .create({
              userId,
              products: [{ productId, qty }]
            })
        }
        // console.log('3 >>> ini cart products', cart.products);
        let updatedProducts = []
        updatedProducts.push({ productId, qty })

        cart.products.forEach(product => {
          if (product.productId == productId) {
            // console.log('5 >>> ini product', product.productId, productId);   
            product.qty += Number(qty)
          }
          updatedProducts.push(product)
        })
        cart.products = updatedProducts
        const newCart = cart.products
        // console.log('4 >>> ini new cart', updatedProducts);       
        return Cart
          .findOneAndUpdate({ userId }, {
            products: newCart
          }, { new: true })
      })
      .then(cart => {
        res.status(201).send({
          message: 'Successfully added/updated item(s) into the cart!',
          cart
        })
      })
      .catch(next)
  }

  // static updateCart(req, res, next) {
  //   const { productId } = req.params
  //   Cart
  //     .deleteOne({ productId })
  //     .then(cart => {
  //       res.status(200).send({
  //         message: 'Successfully deleted a cart!',
  //         cart
  //       })
  //     })
  //     .catch(next)
  // }

  static updateProductQtyInCart(req, res, next) {
    const { product_id, qty } = req.params
    const userId = req.user.id
    Cart
      .findOne({ userId })
      .then(cart => {
        let updatedProducts = []
        cart.products.forEach(product => {
          // console.log('1 >>> ini product._id', product_id, product._id);
          if (String(product_id) === String(product._id)) {
            // console.log('2 >>> ini product_id', product_id);
            product.qty = qty
          }
          updatedProducts.push(product)
        })
        // console.log('ini updated products', updatedProducts);
        return Cart.findOneAndUpdate({ userId }, {
          products: updatedProducts
        }, { new: true })
      })
      .then(cart => {
        res.status(200).send({
          message: 'Successfully updated product\'s quantity!',
          cart
        })
      })
      .catch(next)
  }
}

module.exports = ControllerCart