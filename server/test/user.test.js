const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const User = require('../models/user')

chai.use(chaiHttp)
const expect = chai.expect

// Create User Account to Database
before(function(done) {
  const data = {
    name: 'Mocha',
    email: 'mocha@chai.com',
    password: 'chaiHttp',
    city: 'Jakarta'
  }
  User.create(data)
    .then(user => {
      console.log('testing: success create initial user')
      done()
    })
    .catch(console.log)
})

// Clear Database After Testing
after(function(done) {
  if(process.env.NODE_ENV === 'testing') {
    User.deleteMany({})
      .then(() => {
        console.log('testing: delete data user success!')
        done()
      })
      .catch(console.log)
  }
})

// Mocha Testing
describe('User Routes', function() {
  describe('POST /users/register', function() {

    context('-----Success Process-----', function() {
      it('should send a success status code 201 and an object of user', function(done) {
        let user = {
          name: 'Luky Winata',
          email: 'winata.luk@gmail.com',
          password: '12345',
          city: 'Jakarta'
        }
        chai.request(app)
          .post('/users/register')
          .send(user)
          .end(function(err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(201)
            expect(res.body).to.have.any.keys('_id', 'name', 'email', 'password', 'city')
            done()
          })
      })
    })

    context('-----Errors Process-----', function() {
      it('1. should send an error with status code 400 because of missing name value', function(done) {
        let user = {
          name: '',
          email: 'winata.luk@gmail.com',
          password: '12345'
        }
        chai.request(app)
          .post('/users/register')
          .send(user)
          .end(function(err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
            expect(res.body.message).to.equal('Validation Error')
            expect(res.body.errors).to.be.an('array').that.includes('Please input your name')
            done()
          })
      })
      it('2. should send an error with status code 400 because of missing email value', function(done) {
        let user = {
          name: 'Luky Winata',
          email: '',
          password: '12345',
          city: 'Jakarta'
        }
        chai.request(app)
          .post('/users/register')
          .send(user)
          .end(function(err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
            expect(res.body.message).to.equal('Validation Error')
            expect(res.body.errors).to.be.an('array').that.includes('Please input your email address')
            done()
          })
      })
      it('3. should send an error with status code 400 because of missing password value', function(done) {
        let user = {
          name: 'Luky Winata',
          email: 'winata.luk@gmail.com',
          password: '',
          city: 'Jakarta'
        }
        chai.request(app)
          .post('/users/register')
          .send(user)
          .end(function(err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
            expect(res.body.message).to.equal('Validation Error')
            expect(res.body.errors).to.be.an('array').that.includes('Please input your password')
            done()
          })
      })
      it('4. should send an error with status code 400 because of invalid email format', function(done) {
        let user = {
          name: 'Luky Winata',
          email: 'winata.gmail.com',
          password: '12345',
          city: 'Jakarta'
        }
        chai.request(app)
          .post('/users/register')
          .send(user)
          .end(function(err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
            expect(res.body.message).to.equal('Validation Error')
            expect(res.body.errors).to.be.an('array').that.includes('Invalid email format')
            done()
          })
      })
      it('5. should send an error with status code 400 because of unmeet password criteria', function(done) {
        let user = {
          name: 'Luky Winata',
          email: 'winata.luk@gmail.com',
          password: '1234',
          city: 'Jakarta'
        }
        chai.request(app)
          .post('/users/register')
          .send(user)
          .end(function(err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
            expect(res.body.message).to.equal('Validation Error')
            expect(res.body.errors).to.be.an('array').that.includes('Please input minimum 5 characters')
            done()
          })
      })
      it('6. should send an error with status code 400 because of duplicate data', function(done) {
        let user = {
          name: 'Luky Winata',
          email: 'winata.luk@gmail.com',
          password: '12345',
          city: 'Jakarta'
        }
        chai.request(app)
          .post('/users/register')
          .send(user)
          .end(function(err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
            expect(res.body.message).to.equal('Validation Error')
            expect(res.body.errors).to.be.an('array').that.includes('E-mail has been used to registered')
            done()
          })
      })
    })
  })
  describe('POST /users/login', function() {
    context('----------Success Process----------', function() {
      it('should send a success with status code 200 and an object of access_token', function(done) {
        let user = {
          email: 'winata.luk@gmail.com',
          password: '12345'
        }
        chai.request(app)
          .post('/users/login')
          .send(user)
          .end(function(err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object').to.have.any.keys('access_token')
            done()
          })
      })
    })
    context('----------Errors Process----------', function() {
      it('1. should send an error with status code 400 because of missing email value', function(done) {
        let user = {
          email: '',
          password: '12345'
        }
        chai.request(app)
          .post('/users/login')
          .send(user)
          .end(function(err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body.message).to.equal('Email or Password must be inputted')
            done()
          })
      })
      it('2. should send an error with status code 400 because of missing password value', function(done) {
        let user = {
          email: 'winata.luk@gmail.com',
          password: ''
        }
        chai.request(app)
          .post('/users/login')
          .send(user)
          .end(function(err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body.message).to.equal('Email or Password must be inputted')
            done()
          })
      })
      it('3. should send an error with status code 401 because email is not yet registered', function(done) {
        let user = {
          email: 'abc@outlook.com',
          password: 123456
        }
        chai.request(app)
          .post('/users/login')
          .send(user)
          .end(function(err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(401)
            expect(res.body.message).to.equal('Email or Password is incorrect')
            done()
          })
      })
      it('4. should send an error with 404 status code because password is incorrect for the respective email', function(done) {
        let user = {
          email: 'winata.luk@gmail.com',
          password: '1234'
        }
        chai.request(app)
          .post('/users/login')
          .send(user)
          .end(function(err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(401)
            expect(res.body.message).to.equal('Email or Password is incorrect')
            done()
          })
      })
    })
  })
})