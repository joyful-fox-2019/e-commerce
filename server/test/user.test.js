const chai = require('chai')
const chaiHTTP = require('chai-http')
const expect = chai.expect
const app = require('../app')
const User = require('../models/user')

chai.use(chaiHTTP)

describe('User Router', function(){
  before(function() {
    this.timeout(6000)
    User.collection.deleteMany({})
    .then(_=> {
      console.log(':Testing User Database Deleted')
    })
    .catch(console.log)
  })

  describe('Register User', function () {
    it('Success Register User', function (done) {
      this.timeout(3000)
      const data = {
        username: "fitra",
        email: "fitra@gmail.com",
        password: "12345"
      }
      chai.request(app)
        .post('/user/register')
        .send(data)
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.all.keys('token', 'username', 'role')
          const { username, token } = res.body
          expect(username).to.equal(data.username)
          expect(token).to.be.a('string')
          done()
        })
    })
    it('Error with 400 Email duplicate data', function(done) {
      this.timeout(3000)
      const data = {
        username: "fitra",
        email: "fitra@gmail.com",
        password: "12345"
      }
      chai.request(app)
      .post('/user/register')
      .send(data)
      .end(function(err, res) {
        expect(err).to.be.null
        expect(res).to.have.status(400)
        expect(res.body).to.be.an('object').to.have.any.keys('message', 'code')
        expect(res.body.message).to.be.an('array').that.include('Error, expected email already exist')
        done()
      })
    })
    it('Error 400 Register User key must be filled', function(done){
      this.timeout(3000)
      const data = {
        username: "",
        email: "",
        password: ""
      }
      chai.request(app)
        .post('/user/register')
        .send(data)
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object')
          expect(res.body.message).to.be.an('array').to.be.include('Username must be filled')
          expect(res.body.message).to.be.an('array').to.be.include('Password must be filled')
          expect(res.body.message).to.be.an('array').to.be.include('Email must be filled')
          done()
        })
    })
    it('Error 400 Email Validation Invalid', function(done){
      this.timeout(3000)
      const data = {
        username: "fitra",
        email:"fitra.com",
        password:"fitra"
      }
      chai.request(app)
        .post('/user/register')
        .send(data)
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
          expect(res.body.message).to.be.an('array').to.be.include('Invalid email format')
          done()
        })
    })
  })
  describe('Login User', function(){
    it('Success Login User', function(done){
      this.timeout(3000)
      const data = {
        email:"fitra@gmail.com",
        password:"12345"
      }
      chai.request(app)
        .post('/user/login')
        .send(data)
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.all.keys('token', 'username', 'role')
          const { token } = res.body
          expect(token).to.be.a('string')
          done()
        })
    })
    it('Error 400 Login User key must be filled', function(done){
      this.timeout(3000)
      const data = {
        email: "",
        password: ""
      }
      chai.request(app)
        .post('/user/login')
        .send(data)
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object')
          expect(res.body.message).to.be.an('string').to.be.include('Invalid Email/Password')
          done()
        })
    })
    it('Error 400 Login User Email is Invalid', function(done){
      this.timeout(3000)
      const data = {
        email: "fitra.com",
        password: "fitra"
      }
      chai.request(app)
        .post('/user/login')
        .send(data)
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object')
          expect(res.body.message).to.be.an('string').to.be.include('Invalid Email/Password')
          done()
        })
    })
    it('Error 400 Login User password is missing', function(done){
      this.timeout(3000)
      const data = {
        email: "fitra@gmail.com",
      }
      chai.request(app)
        .post('/user/login')
        .send(data)
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(500);
          expect(res.body).to.be.an('object')
          expect(res.body.message).to.be.an('string').to.be.include('Illegal arguments: undefined, string')
          done()
        })
    })
    it('Error 400 Login User password is wrong', function(done){
      this.timeout(3000)
      const data = {
        email: "fitra@gmail.com",
        password:"asdf"
      }
      chai.request(app)
        .post('/user/login')
        .send(data)
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object')
          expect(res.body.message).to.be.an('string').to.be.include('Invalid Email/Password')
          done()
        })
    })
    it('Success Create Admin', function(done){
      this.timeout(3000)
      const data = {
        username: "akbar",
        email: "akbar@gmail.com",
        password: "akbar",
      }
      chai.request(app)
        .post('/user/register/admin')
        .send(data)
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.all.keys('role', 'username', 'password', 'email', 'token')
          const { username, role, password, email, token } = res.body
          expect(username).to.equal(data.username)
          expect(role).to.equal('admin')
          expect(password).to.equal(data.password)
          expect(email).to.equal(data.email)
          expect(token).to.be.a('string')
          done()
        })
    })
  })  
})
    