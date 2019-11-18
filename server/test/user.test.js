const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const { user } = require('../models')

const expect = chai.expect
chai.use(chaiHttp)

describe('User Testing', function () {
  this.timeout(20000)
  let regAdmin = {
    name: 'Admin',
    isAdmin: true,
    email: 'admin@mail.com',
    password: 'admin123'
  }
  let regCustomer = {
    name: 'Customer',
    email: 'customer@mail.com',
    password: 'customer123'
  }

  // after all testing done, delete users database
  after(function (done) {
    user
      .deleteMany({})
      .then(result => done())
      .catch(console.log)
  })

  // testing POST /user/register; 2 success & 6 error
  describe('POST /users/register', function () {
    describe('Success Testing', function () {
      it('should return created user admin (ObjectId, name, isAdmin, email, hashPassword)', function (done) {
        chai
          .request(app)
          .post('/users/register')
          .send(regAdmin)
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(201)
            expect(res.body)
              .to.be.an('object')
              .to.have.all.keys('_id', 'name', 'isAdmin', 'email', 'password', 'createdAt', 'updatedAt')
            expect(res.body.name)
              .to.be.a('string')
              .to.equal(regAdmin.name)
            expect(res.body.isAdmin)
              .to.be.a('boolean')
              .to.equal(true)
            expect(res.body.email)
              .to.be.a('string')
              .to.equal(regAdmin.email)
            expect(res.body.password)
              .to.be.a('string')
              .to.not.equal(regAdmin.password)
            done()
          })
      })
      it('should return created user customer (ObjectId, name, isAdmin, email, hashPassword)', function (done) {
        chai
          .request(app)
          .post('/users/register')
          .send(regCustomer)
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(201)
            expect(res.body)
              .to.be.an('object')
              .to.have.all.keys('_id', 'name', 'isAdmin', 'email', 'password', 'createdAt', 'updatedAt')
            expect(res.body.name)
              .to.be.a('string')
              .to.equal(regCustomer.name)
            expect(res.body.isAdmin)
              .to.be.a('boolean')
              .to.equal(false)
            expect(res.body.email)
              .to.be.a('string')
              .to.equal(regCustomer.email)
            expect(res.body.password)
              .to.be.a('string')
              .to.not.equal(regCustomer.password)
            done()
          })
      })
    })
    describe('Error Testing', function () {
      it('should return "Data already exist" with status code 400 when submit regCustomer again', function (done) {
        chai
          .request(app)
          .post('/users/register')
          .send(regCustomer)
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body)
              .to.be.an('object')
              .to.have.all.keys('message')
            expect(res.body.message)
              .to.be.an('array')
              .that.includes('Data already exist')
            done()
          })
      })
      it('should return "Name is required" with status code 400 when submit form without name', function (done) {
        const withoutName = { ...regCustomer }
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
              .to.have.all.keys('message')
            expect(res.body.message)
              .to.be.an('array')
              .that.includes('Name is required')
            done()
          })
      })
      it('should return "Email is required" with status code 400 when submit form without email', function (done) {
        const withoutEmail = { ...regCustomer }
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
              .to.have.all.keys('message')
            expect(res.body.message)
              .to.be.an('array')
              .that.includes('Email is required')
            done()
          })
      })
      it('should return "Password is required" with status code 400 when submit form without password', function (done) {
        const withoutPassword = { ...regCustomer }
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
              .to.have.all.keys('message')
            expect(res.body.message)
              .to.be.an('array')
              .that.includes('Password is required')
            done()
          })
      })
      it('should return "Invalid email format" with status code 400 when submit form but invalid email', function (done) {
        const invalidEmail = { ...regCustomer, email: 'invalidemail.hacktiv' }
        chai
          .request(app)
          .post('/users/register')
          .send(invalidEmail)
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body)
              .to.be.an('object')
              .to.have.all.keys('message')
            expect(res.body.message)
              .to.be.an('array')
              .that.includes('Invalid email format')
            done()
          })
      })
      it('should return "password minimum contain 8 characthers" with status code 400 when submit form but password is less than 8 characters', function (done) {
        const invalidPassword = { ...regCustomer, password: '123456' }
        chai
          .request(app)
          .post('/users/register')
          .send(invalidPassword)
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body)
              .to.be.an('object')
              .to.have.all.keys('message')
            expect(res.body.message)
              .to.be.an('array')
              .that.includes('password minimum contain 8 characthers')
            done()
          })
      })
    })
  })

  // testing POST /user/login; 2 success & 2 error
  describe('POST /users/login', function () {
    let customerLogin = { ...regCustomer }
    let adminLogin = { ...regAdmin }
    delete customerLogin.name
    delete adminLogin.name
    delete adminLogin.isAdmin
    describe('Success Testing', function () {
      it('should return token, name, email, when submit login admin', function (done) {
        chai
          .request(app)
          .post('/users/login')
          .send(adminLogin)
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body)
              .to.be.an('object')
              .to.have.any.keys('token', 'name', 'email')
            expect(res.body.token).to.be.a('string')
            expect(res.body.name)
              .to.be.a('string')
              .to.equal(regAdmin.name)
            expect(res.body.email)
              .to.be.a('string')
              .to.equal(regAdmin.email)
            done()
          })
      })
      it('should return token, name, email, when submit login customer', function (done) {
        chai
          .request(app)
          .post('/users/login')
          .send(customerLogin)
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body)
              .to.be.an('object')
              .to.have.any.keys('token', 'name', 'email')
            expect(res.body.token).to.be.a('string')
            expect(res.body.name)
              .to.be.a('string')
              .to.equal(regCustomer.name)
            expect(res.body.email)
              .to.be.a('string')
              .to.equal(regCustomer.email)
            done()
          })
      })
    })
    describe('Error Testing', function () {
      it('should return "Invalid email/password" with status code 401 when submit login but email is invalid', function (done) {
        const wrongEmail = { ...customerLogin, email: 'salah@mail.com' }
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
        const wrongPassword = { ...customerLogin, password: 'salahpassword' }
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
