const chai = require('chai')
const chaiHttp = require('chai-http')
const User = require('../models/User')
const app = require('../app')

chai.use(chaiHttp)
const expect = chai.expect

// HOOKS: middleware testing
before(function() {
  this.timeout(20000)
  const data = {
    role: 'Buyer',
    email: 'kakashi@gmail.com',
    password: 'cidori'
  }
  User.create(data)
    .then(user => console.log('testing: success create initial user'))
    .catch(console.log)
})

// HOOKS: delete data after testing
after(function(done) {
  this.timeout(20000)
  if(process.env.NODE_ENV === 'testing') {
    User.deleteMany({})
      .then(_ => {
        console.log('testing: delete data user success!')
        done()
      })
      .catch(console.log)
  }
})

describe('User', function () {
  let newUser = {
      role: 'Seller',
      email: 'jiraya@gamil.com',
      password: 'kodokadalahpalindrome'
  }
  this.timeout(10000)
  describe('POST /register', function() {
    describe('success process', function() {
      it('should send an object (_id, password, email) with 201 status code', function(done) {
        chai.request(app)
        .post('/register')
        .send(newUser)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object').to.have.any.keys('_id', 'password')
          done()
        })
      })
    })
    describe('Failed process', function() {
      it('should send an array with 400 status code when No Role described', function(done) {
          let UserNoRole = { ...newUser }
          delete UserNoRole.role
        chai.request(app)
        .post('/register')
        .send(UserNoRole)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('array').that.includes('You must choose your role')
          done()
        })
      })

      it('should send an array with 400 status code when No email described', function(done) {
          let UserNoemail = { ...newUser }
          delete UserNoemail.email
          chai.request(app)
          .post('/register')
          .send(UserNoemail)
          .end(function(err, res) {
              expect(err).to.be.null
              expect(res).to.have.status(400)
              expect(res.body).to.be.an('array').that.includes('Email cant be empty')
              done()
          })
      })

      it('should send an array with 400 status code when No password described', function(done) {
          let UserNopassword = { ...newUser }
          delete UserNopassword.password
          chai.request(app)
          .post('/register')
          .send(UserNopassword)
          .end(function(err, res) {
              expect(err).to.be.null
              expect(res).to.have.status(400)
              expect(res.body).to.be.an('array').that.includes('Password cant be empty')
              done()
          })
      })

      it('should send an array with 400 status code when duplicate email', function(done) {
          let duplicateEmail = { ...newUser }
          duplicateEmail.email = 'kakashi@gmail.com'
          chai.request(app)
          .post('/register')
          .send(duplicateEmail)
          .end(function(err, res) {
              expect(err).to.be.null
              expect(res).to.have.status(400)
              expect(res.body).to.be.an('string').that.includes('Email already registered')
              done()
          })
      })
    })
  })

  describe('POST /login', function() {
      describe('success process', function() {
        it('should send an object ( token) with 200 status code', function(done) {
          chai.request(app)
          .post('/login')
          .send(newUser)
          .end(function(err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('string')
            done()
          })
        })
      })

      describe('Failed process', function() {
        it('should send an array with 404 status code when Wrong Password', function(done) {
            let UserWrongPassword = { ...newUser }
            UserWrongPassword.password = 'katakTerbang'
          chai.request(app)
          .post('/login')
          .send(UserWrongPassword)
          .end(function(err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(404)
            expect(res.body).to.be.an('string').that.includes('Password Salah')
            done()
          })
        })

        it('should send an array with 404 status code when empty email input', function(done) {
          let UserWrongPassword = { ...newUser }
          delete UserWrongPassword.email
        chai.request(app)
        .post('/login')
        .send(UserWrongPassword)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(404)
          expect(res.body).to.be.an('string').that.includes('Email Salah')
          done()
        })
      })
    })
  })
})