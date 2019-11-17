const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const User = require('../models/user')
const generateToken = require('../helpers/generateToken')

chai.use(chaiHttp)
const expect = chai.expect

let token = ''

before(function(done) {
  const data = {
    name: 'gintoki',
    email: 'gintoki@mail.com',
    password: 'gintoki',
    address: 'Kuningan'
  }

  User.create(data) 
    .then(user => {
      const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
        address: user.email
      }
      token = generateToken(payload)
      console.log('Users data for testing is created')
    })
    .catch(console.log)
    .finally(() => {
      done()
    })
})

after(function(done) {
  if(process.env.NODE_ENV == 'testing') {
    User.deleteMany({})
      .then( () => {
        console.log('User is deleted after testing')
        done()
      })
      .catch(console.log)
  }
})

describe('Cart Routes', function() {
  let Product = {
    name: 'Hunter X Hunter',
    description: 'One of the GOATs',
    img: 'Gon',
    stock: 10,
    qty: 1,
    price: 100,
    category: 'Anime'
  }
  describe('GET /cart', function() {
    describe('SuccessProcess', function() {
      it('Should send an object (cart) with 200 status code', function(done) {
        chai.request(app)
        .get('/carts')
        .set('token', token)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          done()
        })
      })
      describe('ErrorProcess because of missing token value', function() {
        it('Should send an error with 400 status code', function(done) {
          chai.request(app)
          .get('/carts')
          .end(function(err, res) {
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('msg', 'errors')
            expect(res.body.msg).to.equal('jwt must be provided')
            done()
          })
        })
      })
    })
  })
  describe('PATCH /carts/add', function() {
    describe('SuccessProcess', function() {
      it('Should send an object (cart) with 200 status code', function(done) {
        chai.request(app)
        .patch('/carts/add')
        .set('token', token)
        .send({
          product: {
            name: 'Hunter X Hunter',
            description: 'One of the GOATs',
            img: 'Gon',
            stock: 10,
            qty: 1,
            price: 100,
            category: 'Anime'
          }
        })
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object').to.have.any.keys('product', 'msg')
          expect(res.body.msg).to.equal('Product is successfully added to the cart')
          done()
        })
      })
    })
    describe('ErrorProcess', function() {
      it('Should send an error with 500 status code because of missing body file', function(done) {
        chai.request(app)
        .patch('/carts/add')
        .set('token', token)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(500)
          expect(res.body).to.be.an('object').to.have.any.keys('msg', 'errors')
          expect(res.body.msg).to.equal('Internal Server Error')
          done()
        })
      })
      it('Should send an error with 400 status code because of missing token value', function(done) {
        chai.request(app)
        .patch('/carts/add')
        .send({
          product: {
            name: 'Hunter X Hunter',
            description: 'One of the GOATs',
            img: 'Gon',
            stock: 10,
            qty: 1,
            price: 100,
            category: 'Anime'
          }
        })
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object').to.have.any.keys('msg', 'errors')
          expect(res.body.msg).to.equal('jwt must be provided')
          done()
        })
      })
    })
    describe('SuccessProcess', function() {
      it('Should send an object (cart) with 200 status code', function(done) {
        chai.request(app)
        .patch('/carts/remove')
        .set('token', token)
        .send({
          product: {
            name: 'Hunter X Hunter',
            description: 'One of the GOATs',
            img: 'Gon',
            stock: 10,
            qty: 1,
            price: 100,
            category: 'Anime'
          }
        })
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object').to.have.any.keys('product', 'msg')
          expect(res.body.msg).to.equal('Product is successfully removed to the cart')
          done()
        })
      })
    })
    describe('ErrorProcess', function() {
      it('Should send an error with 500 status code because of missing body value', function(done) {
        chai.request(app)
        .patch('/carts/remove')
        .set('token', token)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(500)
          expect(res.body).to.be.an('object').to.have.any.keys('msg', 'errors')
          expect(res.body.msg).to.equal('Internal Server Error')
          done()
        })
      })
      it('Should send an error with 400 status code because of missing token value', function(done) {
        chai.request(app)
        .patch('/carts/remove')
        .send({
          product: {
            name: 'Hunter X Hunter',
            description: 'One of the GOATs',
            img: 'Gon',
            stock: 10,
            qty: 1,
            price: 100,
            category: 'Anime'
          }
        })
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object').to.have.any.keys('msg', 'errors')
          expect(res.body.msg).to.equal('jwt must be provided')
          done()
        })
      })
    })
  })
})



