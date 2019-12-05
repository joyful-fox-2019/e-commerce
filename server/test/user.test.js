const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../app')
chai.use(chaiHttp)
const User = require('../models/User')

describe('User Test', function () {
  before(function (done) {
    User.deleteMany({})
      .then(_ => {
        done()
      })
      .catch(console.log)
  })
  after(function (done) {
    User.deleteMany({})
      .then(_ => {
        done()
      })
      .catch(console.log)
  })
  describe('register', function () {
    it('should return _id, name, email, password and access_token when input is valid (admin)', function (done) {
      let body = {
        name: 'Tony Stark',
        email: 'tony@stark.com',
        password: 'iamironman',
        adminPassword: 'excelsior'
      }

      chai.request(app)
      .post('/users/register')
      .send(body)
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).status(201)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.all.keys('_id', 'name', 'email', 'password', 'access_token', 'isAdmin')

        expect(res.body._id).to.be.a('string')
        expect(res.body.name).to.be.a('string')
        expect(res.body.email).to.be.a('string')
        expect(res.body.access_token).to.be.a('string')
        expect(res.body.password).to.be.a('string')
        expect(res.body.isAdmin).to.be.a('boolean')

        expect(res.body._id).to.exist
        expect(res.body.name).to.exist
        expect(res.body.email).to.exist
        expect(res.body.access_token).to.exist
        expect(res.body.password).to.exist
        expect(res.body.isAdmin).to.exist

        expect(res.body.isAdmin).to.be.equal(true)
        expect(res.body.password).to.be.not.equal(body.password)
        done()
      })
    })
    it('should return error message when email is already registered', function (done) {
      let body = {
        name: 'Tony Stark',
        email: 'tony@stark.com',
        password: 'iamironman',
        adminPassword: 'excelsior'
      }

      chai.request(app)
      .post('/users/register')
      .send(body)
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).status(400)
        console.log(res.body)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.all.keys('messages')

        expect(res.body.messages).to.include('Email is already registered')
        done()
      })
    })
    it('should return _id, name, email, password and access_token when input is valid (customer)', function (done) {
      let body = {
        name: 'Peter Parker',
        email: 'parker@bugle.com',
        password: 'webhead'
      }

      chai.request(app)
      .post('/users/register')
      .send(body)
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).status(201)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.all.keys('_id', 'name', 'email', 'password', 'access_token')

        expect(res.body._id).to.be.a('string')
        expect(res.body.name).to.be.a('string')
        expect(res.body.email).to.be.a('string')
        expect(res.body.access_token).to.be.a('string')
        expect(res.body.password).to.be.a('string')

        expect(res.body._id).to.exist
        expect(res.body.name).to.exist
        expect(res.body.email).to.exist
        expect(res.body.access_token).to.exist
        expect(res.body.password).to.exist

        expect(res.body.isAdmin).to.not.exist
        expect(res.body.password).to.be.not.equal(body.password)
        done()
      })
    })
    it('should return error messages when input is empty', function (done) {
      let body = {
        name: '',
        email: '',
        password: ''
      }

      chai.request(app)
      .post('/users/register')
      .send(body)
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).status(400)
        expect(res.body).to.be.an('object')

        expect(res.body.messages).to.include('Name cannot be empty')
        expect(res.body.messages).to.include('Email cannot be empty')
        expect(res.body.messages).to.include('Password cannot be empty')
        done()
      })
    })
    it('should return error messages when email is invalid and password is too short', function (done) {
      let body = {
        name: 'Steve Rogers',
        email: 'steve',
        password: 'steve'
      }

      chai.request(app)
      .post('/users/register')
      .send(body)
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).status(400)
        expect(res.body).to.be.an('object')

        expect(res.body.messages).to.include('steve is not a valid email format')
        expect(res.body.messages).to.include('Password have to be at least 6 characters')
        done()
      })
    })
  })
  describe('login', function () {
    it('should return _id, name, email, and access_token when input is valid (admin)', function (done) {
      let body = {
        email: 'tony@stark.com',
        password: 'iamironman'
      }

      chai.request(app)
      .post('/users/login')
      .send(body)
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).status(200)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.all.keys('_id', 'name', 'email', 'isAdmin', 'access_token')

        expect(res.body._id).to.be.a('string')
        expect(res.body.name).to.be.a('string')
        expect(res.body.email).to.be.a('string')
        expect(res.body.isAdmin).to.be.a('boolean')
        expect(res.body.access_token).to.be.a('string')

        expect(res.body._id).to.exist
        expect(res.body.name).to.exist
        expect(res.body.email).to.exist
        expect(res.body.isAdmin).to.exist
        expect(res.body.access_token).to.exist

        expect(res.body.isAdmin).to.be.equal(true)
        done()
      })
    })
    it('should return error message when email/password is wrong', function (done) {
      let body = {
        email: 'tony@stark.com',
        password: 'iaminevitable'
      }
  
      chai.request(app)
      .post('/users/login')
      .send(body)
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).status(400)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.all.keys('messages')
  
        expect(res.body.messages).include('Wrong email/password')
        done()
      })
    })
  })
})