const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const User = require('../models/user')

const expect = chai.expect
chai.use(chaiHttp)

let newUser = {
  username: 'john doe',
  email: 'john@doe.com',
  password: '1234567'
}

let userLogin = {
  email : newUser.email,
  password: newUser.password
}

before(function (){
  User.create(newUser)
    .then(()=> {
      console.log('create initial user');
    })
    .catch(console.log)
  })

after(function(done){
  if(process.env.NODE_ENV === 'testing'){
    User.deleteMany()
    .then(()=> {
      console.log('User test finished');
      done()
    })
    .catch(console.log)
  }
})

describe('User Test', function () {
  describe('POST /users/register', function () {
    it('Should return Object of (user, message) with status 201 when successfully register', function (done) {
      chai
        .request(app)
        .post('/users/register')
        .send({
          username: 'janedoe',
          email: 'jane@doe.com',
          password: '1234567'
        })
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object').to.have.any.keys('user', 'message')
          expect(res.body.user).to.be.an('object').to.have.any.keys('username', 'email', 'password', '_id')
          expect(res.body.message).to.equal('Successfully registered')
          done()
        })
    })
    it('Should return object (message, errors) with status 400 when username is empty', function (done) {
      chai
        .request(app)
        .post('/users/register')
        .send({
          username: '',
          email: 'user@email.com',
          password: '1234567'
        })
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
          expect(res.body.message).to.equal('Validation Error')
          expect(res.body.errors).to.be.an('array').that.includes('Username is required')
          done()
        })
    })
    it('Should return object (message, errors) with status 400 when email is empty', function (done) {
      chai
        .request(app)
        .post('/users/register')
        .send({
          username: 'username',
          email: '',
          password: '1234567'
        })
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
          expect(res.body.message).to.equal('Validation Error')
          expect(res.body.errors).to.be.an('array').that.includes('Email is required')
          done()
        })
    })
    it('Should return object (message, errors) with status 400 when password is empty', function (done) {
      chai
        .request(app)
        .post('/users/register')
        .send({
          username: 'username',
          email: 'user@email.com',
          password: ''
        })
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
          expect(res.body.message).to.equal('Validation Error')
          expect(res.body.errors).to.be.an('array').that.includes('Password is required')
          done()
        })
    })
    it('Should return error object (message, errors) with status 400 when existing email is inserted', function (done) {
      chai
        .request(app)
        .post('/users/register')
        .send(newUser)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
          expect(res.body.message).to.equal('Validation Error')
          expect(res.body.errors).to.be.an('array').that.includes('This email address is already taken')
          expect(res.body.errors).includes('This username is already taken')
          done()
        })
    })
    it('Should return error object (message, errors) with status 400 when email format is invalid', function (done) {
      chai
        .request(app)
        .post('/users/register')
        .send({
          username: 'username',
          email: '12345.com',
          password: '1234567'
        })
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
          expect(res.body.message).to.equal('Validation Error')
          expect(res.body.errors).to.be.an('array').that.includes('Invalid email address format')
          done()
        })
    })
    it('Should return error object (message, errors) when username length is less than 4 characters', function (done) {
      chai
        .request(app)
        .post('/users/register')
        .send({
          username: 'lah',
          email: 'lahlah@mail.com',
          password: '1234567'
        })
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
          expect(res.body.message).to.equal('Validation Error')
          expect(res.body.errors).to.be.an('array').that.includes('Username minimum length is 4 characters')
          done()
        })
    })
    it('Should return error object (message, errors) when password length is less than 6 characters', function (done) {
      chai
        .request(app)
        .post('/users/register')
        .send({
          username: 'lahlahlah',
          email: 'lahlah@mail.com',
          password: '12345'
        })
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
          expect(res.body.message).to.equal('Validation Error')
          expect(res.body.errors).to.be.an('array').that.includes('Password minimum length is 6 characters')
          done()
        })
    })
  })
  describe('POST /users/login', function () {
    it('Should return object (token message) with status 200 when successfully login', function (done) {
      chai
        .request(app)
        .post('/users/login')
        .send(userLogin)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object').to.have.any.keys('token', 'message')
          expect(res.body.message).to.equal('Welcome back!')
          done()
        })
    })
    it('Should return error message with status 400 when email is incorrect', function (done) {
      let wrongEmail = { ...userLogin}
      wrongEmail.email = 'bam@bang.com'
      
      chai
        .request(app)
        .post('/users/login')
        .send(wrongEmail)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object').to.have.any.keys('message')
          expect(res.body.message).to.equal('Invalid email/password')
          done()
        })
    })
    it('Should return error message with status 400 when password is incorrect', function (done) {
      let wrongPass = { ...userLogin}
      wrongPass.password = '7654321'

      chai
        .request(app)
        .post('/users/login')
        .send(wrongPass)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object').to.have.any.keys('message')
          expect(res.body.message).to.equal('Invalid email/password')
          done()
        })
    })
    it('Should return error message with status 400 when email and password are empty', function (done) {
      chai
        .request(app)
        .post('/users/login')
        .send({ email: '', password: ''})
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object').to.have.any.keys('message')
          expect(res.body.message).to.equal('Invalid email/password')
          done()
        })
    })
  })
})