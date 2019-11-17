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

describe('Transaction Routes', function() {
  describe('PATCH /transactions/tracknumber/:id', function() {
    describe('SuccessProcess', function() {
      it('Should send an object (msg) with 200 status code', function(done) {
        chai.request(app)
        .patch('/transactions/tracknumber/5daac0131137161bf55e41e6')
        .send({
          trackNumber: '123'
        })
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object').to.have.any.keys('msg')
          expect(res.body.msg).to.equal('Successfully input the track number')
          done()
        })
      })
    })
    describe('ErrorProcess', function() {
      it('Should send an error with 500 status code because of invalid id', function(done) {
        chai.request(app)
        .patch('/transactions/tracknumber/asd')
        .send({
          trackNumber: '123'
        })
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(500)
          expect(res.body).to.be.an('object').to.have.any.keys('msg', 'errors')
          expect(res.body.msg).to.equal('Internal Server Error')
          done()
        })
      })
      it('Should send an error with 500 status code because of missing body value', function(done) {
        chai.request(app)
        .patch('/transactions/tracknumber/asd')
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(500)
          expect(res.body).to.be.an('object').to.have.any.keys('msg', 'errors')
          expect(res.body.msg).to.equal('Internal Server Error')
          done()
        })
      })
    })
  })
  describe('PATCH /transactions/confirm/:id', function() {
    describe('SuccessProcess', function() {
      it('Should send an object (msg) with 200 status code', function(done) {
        chai.request(app)
        .patch('/transactions/confirm/5daac0131137161bf55e41e6')
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object').to.have.any.keys('msg')
          expect(res.body.msg).to.equal('Transaction is completed')
          done()
        })
      })
    })
    describe('ErrorProcess', function() {
      it('Should send an error with 500 status code', function(done) {
        chai.request(app)
        .patch('/transactions/confirm/asd')
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(500)
          expect(res.body).to.be.an('object').to.have.any.keys('msg')
          expect(res.body.msg).to.equal('Internal Server Error')
          done()
        })
      })
    })
  })
  describe('GET /transactions/user', function() {
    describe('SuccessProcess', function() {
      it('Should send an object (transaction) with 200 status code', function(done) {
        chai.request(app)
        .get('/transactions/user')
        .set('token', token)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('array')
          done()
        })
      })
    })
    describe('ErrorProcess', function() {
      it('Should send an error with 400 status code because of missing token value', function(done) {
        chai.request(app)
        .get('/transactions/user')
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object').to.have.any.keys('msg', 'errors')
          expect(res.body.msg).to.equal('jwt must be provided')
          done()
        })
      })
    })
    describe('GET /completed', function() {
      describe('SuccessProcess', function() {
        it('Should send an object (transaction) with 200 status code', function(done) {
          chai.request(app)
          .get('/transactions/completed')
          .end(function(err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('array')
            done()
          })
        })
      })
    })
    describe('GET /uncompleted', function() {
      describe('SuccessProcess', function() {
        it('Should send an object (transaction) with 200 status code', function(done) {
          chai.request(app)
          .get('/transactions/uncompleted')
          .end(function(err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('array')
            done()
          })
        })
      })
    })
  })
  describe('POST /', function() {
    describe('ErrorProcess', function() {
      it('Should send an error with 400 status code because of missing token value', function(done) {
        chai.request(app)
        .post('/transactions')
        .send({
          cart: '5dab37e540f05d37eaf1b768',
          total: 123,
          product: []
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