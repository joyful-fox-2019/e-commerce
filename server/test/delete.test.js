const chai = require('chai');
const chaiHttp = require('chai-http');
const Product = require('../models/product');
const Cart = require('../models/cart');
const Category = require('../models/category');
const app = require('../app');

chai.use(chaiHttp)
const expect = chai.expect;

let initialUser,
initialProduct,
initialToken

before(function () {
  const data = {
    condition: 'new',
    description: 'new Product',
    name: 'product',
    price: 1000,
    stock: 10,
    product_image: 'http://lala.com'
  }
  Product.create(data)
    .then(product => {
      initialProduct = product
    })
    .catch(console.log)
})

after(function () {
  if(process.env.NODE_ENV == 'testing') {
    Product.deleteMany()
      .then(() => {
        console.log('success')
      })
      .catch(console.log)
  }
})

describe('success deleting', function () {
  it('deleting all databse', function (done) {
    chai.request(app)
      .get('/cart')
      .end(function(err,res) {
        expect(err).to.be.null;
        done()
      })
  })
})