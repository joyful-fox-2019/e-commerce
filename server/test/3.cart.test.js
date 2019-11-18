const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const User = require('../models/User')
const Product = require('../models/Product')
const Cart = require('../models/Cart')
const { verify } = require('../helpers/session')

chai.use(chaiHttp)
const expect = chai.expect

// create initial data
let userSignin = {
  email: 'angela@gmail.com',
  password: 'hidupdana'
}

let newProduct = {
  name: 'caramel',
  price: 20000,
  image: 'image',
  stock: 200,
  category: 'Macarons'
}
let initialProduct = {}
let userToken = ''
let userId, newCart, createdCart;
let falseId = '5d63b24530a316a809302c57'
let invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

// delete data after testing
after(function(done) {
  if(process.env.NODE_ENV === 'testing') {
    Product.deleteMany({})
      .then(_ => {
        console.log('testing: delete data products success!')
        return User.deleteMany({})
      })
      .then(_ => {
        return Cart.deleteMany({})
      })
      .then(_ => {
        console.log('testing: delete data user success!')
        done()
      })
      .catch(console.log)
  }
})

describe('carts CRUD', function() {
    this.timeout(10000)
  before(function(done){
    
    Product.create({
      name: 'caramel',
      price: 20000,
      image: 'image',
      stock: 200,
      category: 'Macarons'
    })
    .then( product => {
        initialProduct = product;

        chai.request(app)
        .post('/users/signin')
        .send(userSignin)
        .end(function(err, res) {
            userToken = JSON.parse(res.text).token;
            const decoded = verify(userToken, process.env.JWT_SECRET);
            userId = decoded.id
            newCart = {
                UserId: userId,
                ProductId: [ String(initialProduct._id) ]
            }
            done()
        })
    })
    .catch(err => console.log(err));
  })
  describe('POST /carts', function() {
    describe('success process', function() {
      it('should send an object (_id, UserId, ProductId, isActive) with 201 status code', function(done) {
        chai.request(app)
        .post('/carts')
        .send(newCart)
        .set('authorization', userToken)
        .end(function(err, res) {
          createdCart = res.body;
          expect(err).to.be.null
          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object').to.have.any.keys('_id', 'UserId', 'ProductId', 'isActive')
          expect(res.body).to.includes({ UserId: newCart.UserId })
          expect(res.body.ProductId).to.be.an('array')
          done()
        })
      })
    })
    describe('errors process', function() {
      it('should send an error with 401 status code because token undefined', function(done) {
        chai.request(app)
        .post('/carts')
        .send(newCart)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(401)
          expect(res.body).to.be.an('object').to.have.any.keys('message')
          expect(res.body.message).to.equal('jwt must be provided')
          done()
        })
      })
      it('should send an error with 401 status code because invalid token', function(done) {
        chai.request(app)
        .post('/carts')
        .send(newCart)
        .set('authorization', invalidToken)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(401)
          expect(res.body).to.be.an('object').to.have.any.keys('message')
          expect(res.body.message).to.equal('invalid signature')
          done()
        })
      })
    })
  })
  describe('GET /carts', function() {
    describe('success process', function() {
      it('should send an array of object with 200 status code', function(done) {
        chai.request(app)
        .get('/carts')
        .set('authorization', userToken)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('array')
          done()
        })
      })
    })
    describe('error process', function() {
      it('should send an error with 401 status code because token undefined', function(done) {
        chai.request(app)
        .get('/carts')
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(401)
          expect(res.body).to.be.an('object').to.have.any.keys('message')
          expect(res.body.message).to.equal('jwt must be provided')
          done()
        })
      })
      it('should send an error with 401 status code because invalid token', function(done) {
        chai.request(app)
        .get('/carts')
        .set('authorization', invalidToken)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(401)
          expect(res.body).to.be.an('object').to.have.any.keys('message')
          expect(res.body.message).to.equal('invalid signature')
          done()
        })
      })
    })
  })
  describe('GET /carts/:id', function() {
    describe('errors process', function() {
      it('should send an object with message product not found and 404 status code because _id', function(done) {
        chai.request(app)
        .get('/carts/' + falseId)
        .set('authorization', userToken)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(404)
          expect(res.body).to.be.an('object').to.have.any.keys('message')
          expect(res.body.message).to.equal('cart not found')
          done()
        }) 
      })
      it('should send an error with 403 status code because token undefined', function(done) {
        chai.request(app)
        .get('/carts/' + createdCart._id)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(401)
          expect(res.body).to.be.an('object').to.have.any.keys('message')
          expect(res.body.message).to.equal('jwt must be provided')
          done()
        })
      })
      it('should send an error with 403 status code because invalid token', function(done) {
        chai.request(app)
        .get('/carts/' + createdCart._id)
        .set('authorization', invalidToken)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(401)
          expect(res.body).to.be.an('object').to.have.any.keys('message')
          expect(res.body.message).to.equal('invalid signature')
          done()
        })
      })
    })
    describe('success process', function() {
      it('should send correct data with 200 status code', function(done) {
        chai.request(app)
        .get('/carts/' + createdCart._id)
        .set('authorization', userToken)
        .end(function(err, res) {
            console.log(userToken, userId)
            console.log('ini dr testcase', res.body)
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object').to.have.any.keys('_id', 'UserId', 'ProductId')
          expect(res.body).to.includes({ UserId: newCart.UserId })
          expect(res.body.UserId).to.equal(newCart.UserId)
          expect(res.body.ProductId).to.be.an('array')
          done()
        })
      })
    })
  })
  describe('DELETE /carts/:id', function() {
    describe('errors process', function() {
      it('should send an object with message unauthorized', function(done) {
        chai.request(app)
        .delete('/carts/' + createdCart._id)
        .set('authorization', invalidToken)
        .end(function(err, res) {
            console.log(res.body, 'ini testing 123 ')
          expect(err).to.be.null
          expect(res).to.have.status(401)
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal('invalid signature')
          done()
        })
      })
      it('should send an object with message cart not found and 404 status code because _id', function(done) {
        chai.request(app)
        .delete('/carts/' + falseId)
        .set('authorization', userToken)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(404)
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal('cart not found')
          done()
        })
      })
      it('should send an error with 403 status code because token undefined', function(done) {
        chai.request(app)
        .delete('/carts/' + createdCart._id)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(401)
          expect(res.body).to.be.an('object').to.have.any.keys('message')
          expect(res.body.message).to.equal('jwt must be provided')
          done()
        })
      })
    })
    describe('success process', function() {
      it('should send 204 status code', function(done) {
        chai.request(app)
        .delete('/carts/' + createdCart._id)
        .set('authorization', userToken)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(204)
          done()
        })
      })
    })
  })
})