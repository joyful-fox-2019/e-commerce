const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../app.js')
const db = require('../models/user')

chai.use(chaiHttp)

after(function () {
  db.collection.deleteMany({})
})
describe('User', function () {

  describe('register', function () {
    // Success
    it('should success add new user without error with status 201 and user will get token, username and role', function (done) {
      let body = {
        username: 'user',
        email: 'email@gmail.com',
        password: 'password',
        role: 'admin'
      }

      chai.request(app)
        .post('/users/register')
        .send(body)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(201)
          expect(res.body).to.have.all.keys(
            'token',
            'username',
            'role'
          )
          done()
        })
    })

    // error : username, email, password required!
    it(`should error with status 400 and message username is required, email, password required!`, function (done) {
      let body = {
        username: '',
        email: '',
        password: '',
        role: 'admin'
      }

      chai.request(app)
        .post('/users/register')
        .send(body)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.include('Username is required!')
          expect(res.body).to.be.include('Email is required!')
          expect(res.body).to.be.include(`Password is required!`)
          done()
        })
    })

    // error : uniqueValidation
    it(`Should error with status 400 and have message "Error, expected (username / email) to be unique."`, function (done) {
      let body = {
        username: 'user',
        email: 'email@gmail.com',
        password: 'password',
        role: 'admin'
      }

      chai.request(app)
        .post('/users/register')
        .send(body)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res.body).to.be.include(`Error, expected username to be unique.`)
          expect(res.body).to.be.include(`Error, expected email to be unique.`)
          expect(res).to.have.status(400)
          done()
        })
    })

    // error: Email not match
    it('Should error with status 400 and have message "Invalid email format."', function (done) {
      let body = {
        username: 'users1',
        email: 'user',
        password: 'password',
        role: 'admin'
      }

      chai.request(app)
        .post('/users/register')
        .send(body)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.include('Invalid email format.')
          done()
        })
    })
  })

  describe('login', function () {
    // Success
    it(`Should success login with status 200 and user will get token, username and role user`, function (done) {
      let body = {
        identity: 'user',
        password: 'password'
      }

      chai.request(app)
        .post('/users/login')
        .send(body)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.have.all.keys('token', 'username', 'role')
          done()
        })
    })

    // Error: Username / Password wrong
    it(`Should error with status 400 and user will get message "Username / Email / Password wrong!"`, function (done) {
      let body = {
        identity: 'users',
        password: 'users'
      }

      chai.request(app)
        .post('/users/login')
        .send(body)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(401)
          expect(res.body).to.be.equal('Username / Email / Password wrong!')
          done()
        })
    })
  })
  })