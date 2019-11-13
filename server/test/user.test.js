const chai = require('chai')
const chaiHttp = require('chai-http')
const User = require('../models/User')
const app = require('../app')

chai.use(chaiHttp)
const expect = chai.expect

before(function(){
  const userDummy = {
    username: 'lebah',
    email: 'lebahcakep@mail.com',
    password: 'lebahcakep'
  }
  User.create(userDummy)
    .then(user=>{
      console.log('testing success')
    })
    .catch(console.log)
})

after(function(done){
  if(process.env.NODE_ENV === 'testing'){
    User.deleteMany()
      .then(_=>{
        console.log('delete success')
        done()
      })
      .catch(console.log)
  }
})

describe('user router', function(){
  describe('POST /users/register', function(){
    const newUser = {
      username: 'bukanpain',
      email: 'bukanpain@mail.com',
      password: 'bukanpainakatsuki'
    }
    describe('register success', function(){
      it('should return object (username, email, password, _id) with 201 status code', function(done){
        chai.request(app)
          .post('/users/register')
          .send(newUser)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(201)
            expect(res.body).to.be.an('object').that.contain.keys('username', 'email', 'password', '_id')
            done()
          })
      })
    })
    describe('register error', function(){
      it('should return an error with status code 400 because missing password', function(done){
        let withoutPassword = {...newUser}
        delete withoutPassword.password
        chai.request(app)
          .post('/users/register')
          .send(withoutPassword)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').that.contain.keys('errors', 'message')
            expect(res.body.message).to.equal('Validation Error')
            expect(res.body.errors).to.be.an('array').that.include('Password is empty')
            done()
          })
      })

      it('should return an error with status code 400 because missing username', function(done){
        let withoutUsername = {...newUser}
        delete withoutUsername.username
        chai.request(app)
          .post('/users/register')
          .send(withoutUsername)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').that.contain.keys('errors', 'message')
            expect(res.body.message).to.equal('Validation Error')
            expect(res.body.errors).to.be.an('array').that.include('Username is empty')
            done()
          })
      })

      it('should return an error with status code 400 because missing email', function(done){
        let withoutEmail = {...newUser}
        delete withoutEmail.email
        chai.request(app)
          .post('/users/register')
          .send(withoutEmail)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').that.contain.keys('errors', 'message')
            expect(res.body.message).to.equal('Validation Error')
            expect(res.body.errors).to.be.an('array').that.include('Email is empty')
            done()
          })
      })

      it('should return an error with status code 400 because email invalid', function(done){
        let invalidEmail = {...newUser}
        delete invalidEmail.email
        invalidEmail.email = 'wasdwasd'
        chai.request(app)
          .post('/users/register')
          .send(invalidEmail)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').that.contain.keys('errors', 'message')
            expect(res.body.message).to.equal('Validation Error')
            expect(res.body.errors).to.be.an('array').that.include('Invalid email')
            done()
          })
      })

      it('should return an error with status code 400 because email duplicate', function(done){
        chai.request(app)
          .post('/users/register')
          .send(newUser)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').that.contain.keys('errors', 'message')
            expect(res.body.message).to.equal('Validation Error')
            expect(res.body.errors).to.be.an('array').that.include('email already registered')
            done()
          })
      })

      it('should return an error with status code 400 because username duplicate', function(done){
        chai.request(app)
          .post('/users/register')
          .send(newUser)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').that.contain.keys('errors', 'message')
            expect(res.body.message).to.equal('Validation Error')
            expect(res.body.errors).to.be.an('array').that.include('username already registered')
            done()
          })
      })
    })
  })

  describe('POST /users/login', function(){
    const userLogin ={
      email: 'lebahcakep@mail.com',
      password: 'lebahcakep'
    }
    describe('login success', function(){
      it('should return object (user_id, token) with 200 status code', function(done){
        chai.request(app)
          .post('/users/login')
          .send(userLogin)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object').that.contain.keys('token', '_id', 'admin')
            done()
          })
      })
    })
    
    describe('login failed', function(){
      it('should return error with status code 400 because password wrong', function(done){
        const wrongPassword = {...userLogin}.password = 'wasdwasd'
        chai.request(app)
          .post('/users/login')
          .send(wrongPassword)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').that.contain.keys('message')
            expect(res.body.message).to.equals('Wrong email/password')
            done()
          })
      })

      it('should return error with status code 400 because email wrong', function(done){
        const wrongPassword = {...userLogin}.email = 'wasdwasd'
        chai.request(app)
          .post('/users/login')
          .send(wrongPassword)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').that.contain.keys('message')
            expect(res.body.message).to.equals('Wrong email/password')
            done()
          })
      })
    })
  })
})