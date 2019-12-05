const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const User = require('../models/user')

chai.use(chaiHttp)
const expect = chai.expect

let newUser = {
  username: "evans",
  email: "evans@mail.com",
  password: "123456"
}

before(function (){

})

after(function(done) {
  this.timeout(10000)
  if(process.env.NODE_ENV === 'testing') {
    User.deleteMany({})
      .then(() => {
        console.log('reset data testing')
        done()
      })
      .catch(console.log)
  }
})

describe('User Testing', function() {
  describe('POST /register', function() {
    describe('Success Test', function() {
      it('should send an object (token, username) with 201 status code', function(done) {
        this.timeout(15000)
        chai.request(app)
          .post('/register')
          .send(newUser)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(201)
            expect(res.body).to.be.an('object').to.have.any.keys('token', 'username', 'email', 'role', 'cart')
            done()
          })
      })
    })

    describe('Error Test', function() {
      it('should send an error with 400 status code because missing username value', function(done) {
        this.timeout(10000)
        const withoutUsername = { ...newUser }
        delete withoutUsername.username
        chai.request(app)
          .post('/register')
          .send(withoutUsername)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
            expect(res.body.message).to.equal('Validation Error')
            expect(res.body.errors).to.be.an('array').that.includes('Username is required')
            done()
          })
      })

      it('should send an error with 400 status code because missing email value', function(done) {
        this.timeout(10000)
        const withoutEmail = { ...newUser }
        delete withoutEmail.email
        chai.request(app)
          .post('/register')
          .send(withoutEmail)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
            expect(res.body.message).to.equal('Validation Error')
            expect(res.body.errors).to.be.an('array').that.includes('Email is required')
            done()
          })
      })

      it('should send an error with 400 status code because missing password value', function(done) {
        this.timeout(10000)
        const withoutPassword = { ...newUser }
        delete withoutPassword.password
        chai.request(app)
          .post('/register')
          .send(withoutPassword)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
            expect(res.body.message).to.equal('Validation Error')
            expect(res.body.errors).to.be.an('array').that.includes('Password is required')
            done()
          })
      })

      it('should send an error with 400 status code because format email invalid', function(done) {
        this.timeout(10000)
        const falseEmailFormat = { ...newUser, email: 'evansAtmail.com' }
        chai.request(app)
          .post('/register')
          .send(falseEmailFormat)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
            expect(res.body.message).to.equal('Validation Error')
            expect(res.body.errors).to.be.an('array').that.includes('Invalid Email Format')
            done()
          })
      })

      it('should send an error with 400 status code because format password invalid', function(done) {
        this.timeout(10000)
        const falsePasswordFormat = { ...newUser, password: '12345' }
        chai.request(app)
          .post('/register')
          .send(falsePasswordFormat)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
            expect(res.body.message).to.equal('Validation Error')
            expect(res.body.errors).to.be.an('array').that.includes('Password Minimum Contain 6 Character')
            done()
          })
      })

      it('should send an error with 400 status code because duplicate email', function(done) {
        this.timeout(10000)
        chai.request(app)
          .post('/register')
          .send(newUser)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
            expect(res.body.message).to.equal('Validation Error')
            expect(res.body.errors).to.be.an('array').that.includes('Email is Already Exist')
            done()
          })
      })

    })
  })

  describe('POST /login', function() {
    describe('Success Test', function() {
      it('should send an object (token, username) with 200 status code', function(done) {
        this.timeout(10000)
        chai.request(app)
          .post('/login')
          .send(newUser)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object').to.have.any.keys('token', 'username', 'email', 'role', 'cart')
            done()
          })
      })
    })

    describe('Error Test', function() {
      it('should send an error with 404 status code because email not found', function(done) {
        this.timeout(10000)
        const loginUser = { ...newUser, email: '' }
        chai.request(app)
          .post('/login')
          .send(loginUser)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(404)
            expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
            expect(res.body.message).to.equal('Invalid Input')
            expect(res.body.errors).to.be.an('array').that.includes('Email Not Found')
            done()
          })
      })
      
      it('should send an error with 400 status code because wrong password', function(done) {
        this.timeout(10000)
        const loginUser = { ...newUser, password: '' }
        chai.request(app)
          .post('/login')
          .send(loginUser)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
            expect(res.body.message).to.equal('Validation Error')
            expect(res.body.errors).to.be.an('array').that.includes('Wrong Password')
            done()
          })
      })

    })

  })
})