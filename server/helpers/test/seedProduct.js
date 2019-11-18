const User = require('../../models/User')
const Product = require('../../models/Product')

let products = [
    {
        name: 'Product 1',
        image: 'imageUrl',
        desc: 'The point of using Lorem Ipsum is that it has a more-or-less normal distribution',
        price: 100,
        stock: 10
    },
    {
        name: 'Product 2',
        image: 'imageUrl',
        desc: 'The point of using Lorem Ipsum is that it has a more-or-less normal distribution',
        price: 100,
        stock: 10
    },
    {
        name: 'Product 3',
        image: 'imageUrl',
        desc: 'The point of using Lorem Ipsum is that it has a more-or-less normal distribution',
        price: 100,
        stock: 10
    },
    {
        name: 'Product 4',
        image: 'imageUrl',
        desc: 'The point of using Lorem Ipsum is that it has a more-or-less normal distribution',
        price: 100,
        stock: 10
    },
    {
        name: 'Product 5',
        image: 'imageUrl',
        desc: 'The point of using Lorem Ipsum is that it has a more-or-less normal distribution',
        price: 100,
        stock: 10
    }
]

module.exports = function (done) {
    if (process.env.NODE_ENV === 'testing') {
        Product.insertMany(products)
          .then(()=>{
            done()
          })
          .catch(done)
        }
}