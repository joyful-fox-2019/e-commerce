const chai = require('chai')
const chaiHttp = require('chai-http')
const Product = require('../models/Product')
const Cart = require('../models/Cart')
const app = require('../app')

var sellerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYzkxNThjNTIzN2I4MmQ0NGZiZTc3NiIsImVtYWlsIjoiYWppQG1haWwuY29tIiwicm9sZSI6IlNlbGxlciIsImlhdCI6MTU3MzkwMDI1NH0.O5CYNV81Ezt_Sri1pxKeuAm5SxwZ5zKUXm5_uZ16pS0'

var buyerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkY2I4OTFkMWQzODMyMjYzY2M4NWFlOSIsImVtYWlsIjoiYnVkaUBtYWlsLmNvbSIsInJvbGUiOiJCdXllciIsImlhdCI6MTU3MzkwMDQwM30.o9X_ipspWqhAPTK75qXEVgPA-t3WgGYKQheK3lGz5Zs'

var temp

chai.use(chaiHttp)
const expect = chai.expect

// HOOKS: middleware testing
before(function() {
  this.timeout(20000)
  let product = {
    product: 'ayam',
    stock: 10,
    category: 'Food',
    price: 10000,
    imageData: 'google.com'
  }

  let product2 = {
    product: 'ayam',
    stock: 10,
    category: 'Food',
    price: 10000,
    imageData: 'google.com'
  }
  Product.create(product)
    .then(result => {
      temp = result._id
      return Product.create(product2)
    })
    .then ((data) => {
        console.log(data)
    })
    .catch(console.log)
})

after(function(done) {
  this.timeout(50000)
  if(process.env.NODE_ENV === 'testing') {
    Product.deleteMany()
      .then (() => {
        return Cart.deleteMany()
      })
      .then (() => {
          done()
      })
      .catch(console.log)
  }
})

describe('CART', function () {
  this.timeout(30000)
  describe('GET /cart', function () {
    describe('success process', function () {
      it('should return an array with status 200', function (done) {
        chai.request(app)
        .get('/cart')
        .set('token', buyerToken)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('array')
          done()
        })
      })
    })

    describe('Failed process', function () {
      it('should return a string with status 401 when no token inputted', function (done) {
        chai.request(app)
        .get('/cart')
        // .set('token', sellerToken)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(401)
          expect(res.body).to.be.an('string')
          done()
        })
      })

      it('should return a string with status 401 when sellerToken inputted', function (done) {
        chai.request(app)
        .get('/cart')
        .set('token', sellerToken)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(401)
          expect(res.body).to.be.an('string')
          done()
        })
      })
    })
  })
  
  describe('POST /cart', function () {
    describe('success process', function () {
      it('should return an object with status 201', function (done) {
        let testCart = {
            _id: temp,
            countProduct: 2
        }
        chai.request(app)
        .post('/cart')
        .send(testCart)
        .set('token', buyerToken)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object')
          done()
        })
      })
    })

    describe('Failed process', function () {
      it('should return an array with status 400 when no data input', function (done) {
        chai.request(app)
        .post('/cart')
        .set('token', buyerToken)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(404)
          expect(res.body).to.be.an('string')
          done()
        })
      })

      it('should return a string with status 401 when no token send', function (done) {
        let testCart = {
            _id: temp,
            countProduct: 2
        }
        chai.request(app)
        .post('/cart')
        .send(testCart)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(401)
          expect(res.body).to.be.an('string')
          done()
        })
      })
    })
  })

  describe('GET /cart/checkout', function () {
    describe('success process', function () {
      it('should return an object with status 200', function (done) {
        console.log(buyerToken, 'ini token')
        chai.request(app)
        .get(`/cart/checkout`)
        .set('token', buyerToken)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          done()
        })
      })
    })

    describe('failed process', function () {
      it('should return a string with status 401 when no token inputted', function (done) {
        chai.request(app)
        .get(`/cart/checkout`)
        .end(function (err, res) {
            // console.log(res)
          expect(err).to.be.null
          expect(res).to.have.status(401)
          expect(res.body).to.be.an('string')
          done()
        })
      })
    })
  })
})