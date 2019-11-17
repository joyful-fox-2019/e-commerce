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

describe('Category Routes', function() {
  let newCategory = {
    name: 'Anime'
  }
  describe('POST /categories', function() {
    describe('SuccessProcess', function() {
      it('Should send an object (category, msg) with 201 status code', function(done) {
        chai.request(app)
        .post('/categories')
        .set('token', token)
        .send(newCategory)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object').to.have.any.keys('product', 'msg')
          expect(res.body.msg).to.equal('New category is successfully created')
          done()
        })
      })
    })
    describe('ErrorProcess', function() {
      it('Should send an error with 500 status code because of missing body value', function(done) {
        chai.request(app)
        .post('/categories')
        .set('token', token)
        .end(function(err, res) {
          expect(res).to.have.status(400)
          done()
        })
      })
      it('Should send an error with 400 status code because admin is not logged in', function(done) {
        chai.request(app)
        .post('/categories')
        .send(newCategory)
        .end(function(err, res) {
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object').to.have.any.keys('msg', 'errors')
          expect(res.body.msg).to.equal('jwt must be provided')
          done()
        })
      })
    })
  })
  describe('GET /categories', function() {
    describe('SuccessProcess', function() {
      it('Should send an object (categories) with 200 status code', function(done) {
        chai.request(app)
        .get('/categories')
        .send(newCategory)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body[0]).to.have.property('_id');
          expect(res.body[0]).to.have.property('name');
          done()
        })
      })
    })
  })
  describe('GET /categories/:name', function() {
    describe('SuccessProcess', function() {
      it('Should send an object (category) with 200 status code', function(done) {
        chai.request(app)
        .get('/categories/Single Card')
        .send(newCategory)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          done()
        })
      })
    })
  })
})