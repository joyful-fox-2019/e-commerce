const chai = require('chai')
const chaiHttp = require('chai-http')
const User = require('../models/User')
const Product = require('../models/Product')
const UserController = require('../controllers/UserController')
const app = require('../app')

var sellerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYzkxNThjNTIzN2I4MmQ0NGZiZTc3NiIsImVtYWlsIjoiYWppQG1haWwuY29tIiwicm9sZSI6IlNlbGxlciIsImlhdCI6MTU3MzkwMDI1NH0.O5CYNV81Ezt_Sri1pxKeuAm5SxwZ5zKUXm5_uZ16pS0'

var buyerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkY2I4OTFkMWQzODMyMjYzY2M4NWFlOSIsImVtYWlsIjoiYnVkaUBtYWlsLmNvbSIsInJvbGUiOiJCdXllciIsImlhdCI6MTU3MzkwMDQwM30.o9X_ipspWqhAPTK75qXEVgPA-t3WgGYKQheK3lGz5Zs'

var temp

chai.use(chaiHttp)
const expect = chai.expect

// HOOKS: middleware testing
before(function() {
  this.timeout(20000)
  let data = {
    email: 'kakashi@gmail.com',
    password: 'cidori',
    role: 'Seller'
  }
  User.create(data)
    .then(user => {
      return UserController.login(data)
    })
    .then(result => {
      temp = result
      console.log(temp)
    })
    .catch(console.log)
})

// HOOKS: delete data after testing
after(function(done) {
  this.timeout(50000)
  if(process.env.NODE_ENV === 'testing') {
    User.deleteMany()
      .then(_ => {
        console.log('testing: delete data user success!')
        return Product.deleteMany()
      })
      .then (() => {
        done()
      })
      .catch(console.log)
  }
})

describe('Product', function () {
  this.timeout(20000)
  describe('GET /product', function () {
    describe('success process', function () {
      it('should return an array with status 200', function (done) {
        chai.request(app)
        .get('/product')
        .set('token', sellerToken)
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
        .get('/product')
        // .set('token', sellerToken)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(401)
          expect(res.body).to.be.an('string')
          done()
        })
      })

      it('should return a string with status 401 when buyerToken inputted', function (done) {
        chai.request(app)
        .get('/product')
        .set('token', buyerToken)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(401)
          expect(res.body).to.be.an('string')
          done()
        })
      })
    })
  })
  
  describe('POST /product', function () {
    describe('success process', function () {
      it('should return an object with status 201', function (done) {
        let product = {
          product: 'ayam',
          stock: 10,
          category: 'Food',
          price: 10000,
          imageData: 'google.com'
        }
        chai.request(app)
        .post('/product')
        .send(product)
        .set('token', sellerToken)
        .end(function (err, res) {
          temp = res.body._id
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
        .post('/product')
        .set('token', sellerToken)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('array')
          done()
        })
      })

      it('should return a string with status 401 when no token send', function (done) {
        let product = {
          product: 'ayam',
          stock: 10,
          category: 'Food',
          price: 10000,
          imageData: 'google.com'
        }
        chai.request(app)
        .post('/product')
        .send(product)
        // .set('token', sellerToken)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(401)
          expect(res.body).to.be.an('string')
          done()
        })
      })
    })
  })

  describe('GET /product/:id', function () {
    describe('success process', function () {
      it('should return an object with status 200', function (done) {
        chai.request(app)
        .get(`/product/${temp}`)
        .set('token', sellerToken)
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
        .get(`/product/${temp}`)
        // .send(product)
        // .set('token', sellerToken)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(401)
          expect(res.body).to.be.an('string')
          done()
        })
      })
    })
  })

  describe('PATCH /product/:id', function () {
    describe('success process', function () {
      it('should return an object with status 200', function (done) {
        let update = {
          product: 'kambing',
          stock: 12,
          price: 20000
        }
        chai.request(app)
        .patch(`/product/${temp}`)
        .send(update)
        .set('token', sellerToken)
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
        .patch(`/product/${temp}`)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(401)
          expect(res.body).to.be.an('string')
          done()
        })
      })
    })
  })

  describe('DELETE /product/:id', function () {
    describe('success process', function () {
      it('should return an object with status 200', function (done) {
        chai.request(app)
        .delete(`/product/${temp}`)
        .set('token', sellerToken)
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
        .delete(`/product/${temp}`)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(401)
          expect(res.body).to.be.an('string')
          done()
        })
      })
    })
  })

  describe('GET /allProduct', function () {
    describe('Succes process', function () {
      it('should return an array with status 200', function (done) {
        chai.request(app)
        .get(`/allProduct`)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('array')
          done()
        })
      })
    })
  })
})