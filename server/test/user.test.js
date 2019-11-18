require('dotenv').config()
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const User = require('../models/user')
const { genToken } = require('../helpers/jwt')

const expect = chai.expect
chai.use(chaiHttp)

let newUser = {
  username: 'john doe',
  email: 'john@doe.com',
  password: '1234567'
}

let newAdmin = {
  username: 'adminadmin',
  email: 'adminn@mail.com',
  password: 'admiin123',
  role: 'admin'
}

let userLogin = {
  email : newUser.email,
  password: newUser.password
}

let adminToken = ''
let userToken = ''

before( async function () {
  try {
    user = await User.create(newUser)
    userToken = genToken({ id: user._id, role: user.role })
    adm = await User.create(newAdmin)
    adminToken = genToken({ id: adm._id, role: adm.role })
    console.log('Initial user created')
  }
  catch(err){
    console.log(err);
  }
})

after((done) => {
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
          expect(res.body.errors).includes('This email address is already taken')
          done()
        })
    })
    it('Should return error object (message, errors) with status 400 when existing username is inserted', function (done) {
    chai
      .request(app)
      .post('/users/register')
      .send(newUser)
      .end(function (err, res) {
        expect(err).to.be.null
        expect(res).to.have.status(400)
        expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
        expect(res.body.message).to.equal('Validation Error')
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
  describe('GET /verify', function () {
    it('should return object of (message) with status 200 when successful', function (done) {
      chai
        .request(app)
        .get('/users/verify')
        .set('token', userToken)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object').to.have.any.keys('message')
          expect(res.body.message).to.equal('User verified')
          done()
        })
    })
    it('should return object of (message) with status 401 when not logged in', function (done) {
      chai
        .request(app)
        .get('/users/verify')
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(401)
          expect(res.body).to.be.an('object').to.have.any.keys('message')
          expect(res.body.message).to.equal('You must login first')
          done()
        })
    })
    it('should return object of (message) with status 401 when invalid token sent', function (done) {
      chai
        .request(app)
        .get('/users/verify')
        .set('token', 'tokenpalsu')
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(401)
          expect(res.body).to.be.an('object').to.have.any.keys('message')
          expect(res.body.message).to.equal('You must login first')
          done()
        })
    })
  })
  describe('GET /users/admin/verify', function () {
    it('should return object of (message) with status 200 when successful', function (done) {
      chai
      .request(app)
      .get('/users/admin/verify')
      .set('token', adminToken)
      .end(function (err, res) {
        expect(err).to.be.null
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('object').to.have.any.keys('message')
        expect(res.body.message).to.equal('Admin verified')
        done()
      })
    })
    it('should return object of (message) with status 401 when not logged in', function (done) {
      chai
        .request(app)
        .get('/users/admin/verify')
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(401)
          expect(res.body).to.be.an('object').to.have.any.keys('message')
          expect(res.body.message).to.equal('You must login first')
          done()
        })
    })
    it('should return object of (message) with status 401 when invalid token sent', function (done) {
      chai
        .request(app)
        .get('/users/admin/verify')
        .set('token', 'tokenpalsu')
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(401)
          expect(res.body).to.be.an('object').to.have.any.keys('message')
          expect(res.body.message).to.equal('You must login first')
          done()
        })
    })
    it('should return object of (message) with status 403 when user not admin logged in', function (done) {
      chai
        .request(app)
        .get('/users/admin/verify')
        .set('token', userToken)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(403)
          expect(res.body).to.be.an('object').to.have.any.keys('message')
          expect(res.body.message).to.equal('Verification failed')
          done()
        })
    })
  })
  describe('GET /users/cart', function () {
    it('should return user object with status 200 when successful', function (done) {
      chai
        .request(app)
        .get('/users/cart')
        .set('token', userToken)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object').to.have.any.keys('message', '_id', 'cart', 'createdAt', 'email', 'notification', 'password', 'role', 'updatedAt', 'username')
          done()
        })
    })
    it('should return object of (message) with status 401 when not logged in', function (done) {
      chai
        .request(app)
        .get('/users/cart')
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(401)
          expect(res.body).to.be.an('object').to.have.any.keys('message')
          expect(res.body.message).to.equal('You must login first')
          done()
        })
    })
  })
  describe('PATCH /users/cart', function () {
    it('should return object of (user, message) with status 200 when successful', function (done) {
      chai
        .request(app)
        .patch('/users/cart')
        
    })
  })
})