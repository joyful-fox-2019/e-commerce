const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const { user } = require('../models')

const expect = chai.expect
chai.use(chaiHttp)

describe('User Testing', function () {
  this.timeout(20000)
  let newUser = {
    name: 'Ahmad Fadilah',
    email: 'ahmadfadilah@mail.com',
    password: 'ahmadfadilah123'
  }

  // after all testing done, delete users database
  after(function (done) {
    user
      .deleteMany({})
      .then(result => done())
      .catch(console.log)
  })

  // testing POST /user/register; 1 success & 6 error
  describe('POST /users/register', function () {
    describe('Success Testing', function () {
      it('should return created user(ObjectId, name, email, hashPassword)', function (done) {
        chai
          .request(app)
          .post('/users/register')
          .send(newUser)
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(201)
            expect(res.body)
              .to.be.an('object')
              .to.have.any.keys('_id', 'name', 'email', 'password')
            expect(res.body.name)
              .to.be.a('string')
              .to.equal(newUser.name)
            expect(res.body.email)
              .to.be.a('string')
              .to.equal(newUser.email)
            expect(res.body.password)
              .to.be.a('string')
              .to.not.equal(newUser.password)
            done()
          })
      })
    })
    describe('Error Testing', function () {
      it('should return "Data already exist" with status code 400 when submit newUser again', function (done) {
        chai
          .request(app)
          .post('/users/register')
          .send(newUser)
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body)
              .to.be.an('object')
              .to.have.any.keys('message')
            expect(res.body.message)
              .to.be.an('array')
              .that.includes('Data already exist')
            done()
          })
      })
      it('should return "Name is required" with status code 400 when submit form without name', function (done) {
        const withoutName = { ...newUser }
        delete withoutName.name
        chai
          .request(app)
          .post('/users/register')
          .send(withoutName)
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body)
              .to.be.an('object')
              .to.have.any.keys('message')
            expect(res.body.message)
              .to.be.an('array')
              .that.includes('Name is required')
            done()
          })
      })
      it('should return "Email is required" with status code 400 when submit form without email', function (done) {
        const withoutEmail = { ...newUser }
        delete withoutEmail.email
        chai
          .request(app)
          .post('/users/register')
          .send(withoutEmail)
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body)
              .to.be.an('object')
              .to.have.any.keys('message')
            expect(res.body.message)
              .to.be.an('array')
              .that.includes('Email is required')
            done()
          })
      })
      it('should return "Password is required" with status code 400 when submit form without password', function (done) {
        const withoutPassword = { ...newUser }
        delete withoutPassword.password
        chai
          .request(app)
          .post('/users/register')
          .send(withoutPassword)
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body)
              .to.be.an('object')
              .to.have.any.keys('message')
            expect(res.body.message)
              .to.be.an('array')
              .that.includes('Password is required')
            done()
          })
      })
      it('should return "Invalid email format" with status code 400 when submit form but invalid email', function (done) {
        const invalidEmail = { ...newUser, email: 'invalidemail.hacktiv' }
        chai
          .request(app)
          .post('/users/register')
          .send(invalidEmail)
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body)
              .to.be.an('object')
              .to.have.any.keys('message')
            expect(res.body.message)
              .to.be.an('array')
              .that.includes('Invalid email format')
            done()
          })
      })
      it('should return "password minimum contain 8 characthers" with status code 400 when submit form but password is less than 8 characters', function (done) {
        const invalidPassword = { ...newUser, password: '123456' }
        chai
          .request(app)
          .post('/users/register')
          .send(invalidPassword)
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body)
              .to.be.an('object')
              .to.have.any.keys('message')
            expect(res.body.message)
              .to.be.an('array')
              .that.includes('password minimum contain 8 characthers')
            done()
          })
      })
    })
  })

  // testing POST /user/login; 1 success & 2 error
  describe('POST /users/login', function () {
    let userLogin = { ...newUser }
    delete userLogin.name
    describe('Success Testing', function () {
      it('should return token, name, email, when submit login user', function (done) {
        chai
          .request(app)
          .post('/users/login')
          .send(userLogin)
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body)
              .to.be.an('object')
              .to.have.any.keys('token', 'name', 'email')
            expect(res.body.token).to.be.a('string')
            expect(res.body.name)
              .to.be.a('string')
              .to.equal(newUser.name)
            expect(res.body.email)
              .to.be.a('string')
              .to.equal(newUser.email)
            done()
          })
      })
    })
    describe('Error Testing', function () {
      it('should return "Invalid email/password" with status code 401 when submit login but email is invalid', function (done) {
        const wrongEmail = { ...userLogin, email: 'salah@mail.com' }
        chai
          .request(app)
          .post('/users/login')
          .send(wrongEmail)
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(401)
            expect(res.body)
              .to.be.an('object')
              .to.have.any.keys('message')
            expect(res.body.message)
              .to.be.an('array')
              .that.includes('Invalid email/password')
            done()
          })
      })
      it('should return "Invalid email/password" with status code 401 when submit login but password is invalid', function (done) {
        const wrongPassword = { ...userLogin, password: 'salahpassword' }
        chai
          .request(app)
          .post('/users/login')
          .send(wrongPassword)
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(401)
            expect(res.body)
              .to.be.an('object')
              .to.have.any.keys('message')
            expect(res.body.message)
              .to.be.an('array')
              .that.includes('Invalid email/password')
            done()
          })
      })
    })
  })
})
