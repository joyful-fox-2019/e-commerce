const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const User = require('../models/user')

chai.use(chaiHttp)
const expect = chai.expect


after(function(done) {
  User.deleteMany({}, () => {
    console.log(`testing : success deleting user data`);
    done()
  })
})


describe('user', function() {
  describe('POST/users/register', function() {
    describe('register success', function() {
      it('App should return status code 201 and object containing token and message', function(done) {
        const body = {
          username : 'Elizabeth',
          email : 'ebeth@mail.com',
          role : 'customer',
          password : '12345'
        }
        chai
            .request(app)
            .post('/users/register')
            .send(body)
            .end(function(err, res) {
              expect(err).to.be.null;
              expect(res).to.have.status(201);
              expect(res.body).to.be.an('object').to.have.any.keys('token', 'message')
              expect(res.body.message).to.equal('register success')      
              done()        
            })
      })
    })
    describe('register failed', function() {
      it('App should return status code 400 and message empty restriction failed', function(done) {
        const body = {
          username : '',
          email : '',
          role : '',
          password : ''
        }
        chai
            .request(app)
            .post('/users/register')
            .send(body)
            .end(function(err, res) {
              expect(err).to.be.null;
              expect(res).to.have.status(400);
              expect(res.body.message).to.include('register failed')  
              expect(res.body.message).to.include('Please enter your username')
              expect(res.body.message).to.include('Please enter your email')
              expect(res.body.message).to.include('Please enter your password')     
              done()      
            })
      })
      it('App should return status code 400 and message invalid format', function(done) {
        const body = {
          username : 'Elizabeth',
          email : 'ebeth.com',
          role : 'customer',
          password : '123'
        }
        chai
            .request(app)
            .post('/users/register')
            .send(body)
            .end(function(err, res) {
              expect(err).to.be.null
              expect(res).to.have.status(400)
              expect(res.body.message).to.include('register failed')  
              expect(res.body.message).to.include('invalid email format')
              expect(res.body.message).to.include('password has to contain at least 5 character length')
              done()
            })
      })
       it('App should return status code 400 and message unique restriction failed', function(done) {
        const body = {
          username : 'Elizabeth',
          email : 'ebeth@mail.com',
          role : 'customer',
          password : '12345'
        }
        chai
            .request(app)
            .post('/users/register')
            .send(body)
            .end(function(err, res) {
              // console.log(res);
              expect(err).to.be.null;
              expect(res).to.have.status(400);
              expect(res.body.message).to.be.an('array').that.includes('register failed', 'email is already used')      
              done()        
            })
      })

    })
  })
  describe('POST/users/login', function() {
    describe('login success', function() {
      it('App should return status code 200 and object containing token and message', function(done) {
        const body = {
          email : 'ebeth@mail.com',
          role : 'customer',
          password : '12345'
        }
        chai
            .request(app)
            .post('/users/login')
            .send(body)
            .end(function(err, res) {
              expect(err).to.be.null;
              expect(res).to.have.status(200);
              expect(res.body).to.be.an('object').to.have.any.keys('token', 'message')
              expect(res.body.message).to.equal('login success')     
              done()         
            })
      })
    })
    describe('login failed', function() {
      it('App should return status code 400 and message empty restriction failed', function(done) {
        const body = {
          email : '',
          role : '',
          password : ''
        }
        chai
            .request(app)
            .post('/users/login')
            .send(body)
            .end(function(err, res) {
              expect(err).to.be.null;
              expect(res).to.have.status(400);
              expect(res.body.message).to.include('you are not registered. please register first')  
            
              done()       
            })
      })
      it('App should return status code 400 and message invalid format', function(done) {
        const body = {
          username : 'Elizabeth',
          email : 'ebeth.com',
          role : 'customer',
          password : '123'
        }
        chai
            .request(app)
            .post('/users/register')
            .send(body)
            .end(function(err, res) {
              expect(err).to.be.null
              expect(res).to.have.status(400)
              expect(res.body.message).to.include('register failed')  
              expect(res.body.message).to.include('invalid email format')
              expect(res.body.message).to.include('password has to contain at least 5 character length')
              done()
            })
      })
    })

  })
})
