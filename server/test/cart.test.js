const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const Cart = require('../models/cart')
const Product = require('../models/product')
const User = require('../models/user')
const {generateToken} = require('../helpers/jwt')

chai.use(chaiHttp)
const expect = chai.expect

let tokenCustomer
let tokenCustomerLain
let productId
let cartId

before(function (done){
  this.timeout(15000)
  if(process.env.NODE_ENV === 'testing') {
    User.create({
      username: "customer2",
      email: "customer2@mail.com",
      password: "123456"
    })
      .then(result => {
        let payloadCustomer = {email:result.email, _id:result._id, role:result.role}
        tokenCustomer = generateToken(payloadCustomer)
        return User.create({
          username: "customerLain2",
          email: "customerLain2@mail.com",
          password: "123456"
        })
      })
      .then(result => {
        let payloadCustomerLain = {email:result.email, _id:result._id, role:result.role}
        tokenCustomerLain = generateToken(payloadCustomerLain)
        return Product.create({
          name: 'sepatu',
          description: 'bukan sendal',
          price: '5000',
          stock: '2',
          tags: ['kw', 'swallow'],
          image: ['inilinkgambar']
        })
      })
      .then(result => {
        productId = result._id
        console.log('create data testing')
        done()
      })
      .catch(console.log)
  }
})

after(function(done) {
  this.timeout(15000)
  if(process.env.NODE_ENV === 'testing') {
    User.deleteMany({})
      .then(result => {
        return Product.deleteMany({})
      })
      .then(() => {
        return Cart.deleteMany({})
      })
      .then(() => {
        console.log('reset data testing')
        done()
      })
      .catch(console.log)
  }
})

describe('Cart Testing', function() {
  describe('POST /cart', function() {
    describe('Success Test', function() {
      it('should send an object (userId, productId) with 201 status code', function(done) {
        this.timeout(10000)
        chai.request(app)
          .post('/cart')
          .set('token', tokenCustomer)
          .send({
            productId
          })
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(201)
            expect(res.body).to.be.an('object').to.have.any.keys('userId', 'productId')
            cartId = res.body._id
            done()
          })
      })
    })

    describe('Error Test', function() {
      it('should send an error with 400 status code because missing productId value', function(done) {
        this.timeout(10000)
        chai.request(app)
          .post('/cart')
          .set('token', tokenCustomer)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
            expect(res.body.message).to.equal('Validation Error')
            expect(res.body.errors).to.be.an('array').that.includes('productId is required')
            done()
          })
      })

      it('should send an error with 401 status code because required token', function(done) {
        this.timeout(10000)
        chai.request(app)
          .post('/cart')
          .send({
            productId
          })
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(401)
            expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
            expect(res.body.message).to.equal('Json Web Token Error')
            expect(res.body.errors).to.be.an('array').that.includes('JsonWebTokenError')
            done()
          })
      })

    })

  })

  describe('GET /cart', function() {
    describe('Success Test', function() {
      it('should send an array of object (_id, userId, productId) with 200 status code', function(done) {
        this.timeout(10000)
        chai.request(app)
          .get('/cart')
          .set('token', tokenCustomer)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('array')
            expect(res.body[0]).to.be.an('object').to.have.any.keys('_id', 'userId', 'productId')
            done()
          })
      })
    })

    describe('Error Test', function() {
      it('should send an error with 401 status code because required token', function(done) {
        this.timeout(10000)
        chai.request(app)
          .get('/cart')
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(401)
            expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
            expect(res.body.message).to.equal('Json Web Token Error')
            expect(res.body.errors).to.be.an('array').that.includes('JsonWebTokenError')
            done()
          })
      })
    })

  })

  describe('Delete /cart/:id', function() {
    describe('Error Test', function() {
      it('should send an error with 401 status code because required token', function(done) {
        this.timeout(10000)
        chai.request(app)
          .delete(`/cart/${cartId}`)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(401)
            expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
            expect(res.body.message).to.equal('Json Web Token Error')
            expect(res.body.errors).to.be.an('array').that.includes('JsonWebTokenError')
            done()
          })
      })
  
      it('should send an error with 403 status code because not authorized', function(done) {
        this.timeout(10000)
        chai.request(app)
          .delete(`/cart/${cartId}`)          
          .set('token', tokenCustomerLain)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(403)
            expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
            expect(res.body.message).to.equal('Authorization Failed')
            expect(res.body.errors).to.be.an('array').that.includes('Not Authorized')
            done()
          })
        })
        
      it('should send an error with 404 status code because product not found', function(done) {
        this.timeout(10000)
          chai.request(app)
          .delete(`/cart/5dcb7ea5f95cac0b41b5eac7`)
          .set('token', tokenCustomer)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(404)
            expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
            expect(res.body.message).to.equal('Invalid Input')
            expect(res.body.errors).to.be.an('array').that.includes('Not Found')
            done()
          })
      })
    })
    
    describe('Success Test', function() {
      it('should send an object (_id, userId, productId) with 200 status code', function(done) {
        this.timeout(10000)
        chai.request(app)
          .delete(`/cart/${cartId}`)
          .set('token', tokenCustomer)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object').to.have.any.keys('_id', 'userId', 'productId')
            done()
          })
      })
    })

  })

})