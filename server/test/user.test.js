const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const User = require('../models/user')

chai.use(chaiHttp)
const expect = chai.expect

let newUser = {
  name: 'dipadana',
  email: 'dipadana@gmail.com',
  password: '123456'
}
let userSignin = {
  email: newUser.email,
  password: newUser.password
}

before(async () => {
  const data = {
    name: 'dinar',
    email: 'dinar@gmail.com',
    password: '123456'
  }
  User.create(data)
    .then(user => console.log('testing: success create initial user'))
    .catch(console.log)
}) 

after(function(done) {
  if(process.env.NODE_ENV === 'testing') {
    User.deleteMany({})
      .then(_ => {
        console.log('testing: delete data user success!')
        done()
      })
      .catch(console.log)
  }
})

describe('User Routes', () => {

  describe('POST /users/register', () => {

    describe('Success register process', () => {
      it('should send (message) with 201 status code', (done) => {
        chai.request(app)
        .post('/users/register')
        .send(newUser)
        .end((err,res) => {
          expect(err).to.be.null
          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object').to.have.any.keys('message')
          expect(res.body.message).to.equal('Success sign up')
          done()
        })
      })
    })

    describe('Error register process', () => {
      it('should send (message,status) with 400 status code', (done) => {
        const withoutName = { ...newUser }
        delete withoutName.name
        chai.request(app)
        .post('/users/register')
        .send(withoutName)
        .end((err,res) => {
          console.log(res.body)
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object').to.have.any.keys('message','errors')
          expect(res.body.message).to.equal('validation error')
          expect(res.body.errors).to.be.an('array').that.include('Name required')
          done()
        })
      })
      it('should send (message,status) with 400 status code', (done) => {
        const withoutEmail = { ...newUser }
        delete withoutEmail.email
        chai.request(app)
        .post('/users/register')
        .send(withoutEmail)
        .end((err,res) => {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object').to.have.any.keys('message','errors')
          expect(res.body.message).to.equal('validation error')
          expect(res.body.errors).to.be.an('array').that.includes('Email required')
          done()
        })
      })
      it('should send (message,status) with 400 status code', (done) => {
        const withoutPassword = { ...newUser }
        delete withoutPassword.password
        chai.request(app)
        .post('/users/register')
        .send(withoutPassword)
        .end((err,res) => {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object').to.have.any.keys('message','errors')
          expect(res.body.message).to.equal('validation error')
          expect(res.body.errors).to.be.an('array').that.includes('Password required')
          done()
        })
      })
      it('should send an error with 400 status code because format email invalid', function(done) {
        const falseEmailFormat = { ...newUser, email: 'salahformat.com' }
        chai.request(app)
        .post('/users/register')
        .send(falseEmailFormat)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
          expect(res.body.message).to.equal('validation error')
          expect(res.body.errors).to.be.an('array').that.includes('Email invalid format')
          done()
        })
      })
      it('should send an error with 400 status code because duplicate data', function(done) {
        chai.request(app)
        .post('/users/register')
        .send(newUser)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
          expect(res.body.message).to.equal('validation error')
          expect(res.body.errors).to.be.an('array').that.includes('Email is already registred!')
          done()
        })
      })
    })

  })

  describe('POST /users/login', () => {
    describe('success login process', () => {
      it('should send an object (message,access_token,name) with 200 status code', (done) => {
        chai.request(app)
        .post('/users/login')
        .send(userSignin)
        .end((err,res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object').to.have.any.keys('message','access_token','name')
          expect(res.body.message).to.be.an('string').to.equal('Login successfuly!')
          expect(res.body.name).to.be.an('string')
          expect(res.body.access_token).to.be.an('string')
          done()
        })
      })
    })
    describe('error login process', () => {
      it('should send an error with 400 status code because missing password value', (done) => {
        const withoutEmail = { ...userSignin }
        delete withoutEmail.email
        chai.request(app)
        .post('/users/login')
        .send(withoutEmail)
        .end((err,res) => {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object').to.have.any.keys('message')
          expect(res.body.message).to.equal('Invalid email/password')
          done()
        })
      })
      it('should send an error 404 status code because invalid email', (done) => {
        const falseEmail = { ...userSignin }
        falseEmail.email = "kucintadia@love.com"
        chai.request(app)
        .post('/users/login')
        .send(falseEmail)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object').to.have.any.keys('message')
          expect(res.body.message).to.equal('Invalid email/password')
          done()
        })
      })
      it('should send an error with 404 status code because invalid password', () => {
        const falsePassword = { ...userSignin }
        falsePassword.password = 'passwordKosasih'
        chai.request(app)
        .post('/users/login')
        .send(falsePassword)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(404)
          expect(res.body).to.be.an('object').to.have.any.keys('message')
          expect(res.body.message).to.equal('Invalid email/password')
          done()
        })
      })
    })
  })

})