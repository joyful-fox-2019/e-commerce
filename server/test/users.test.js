const chai = require('chai')
const chaiHttp = require('chai-http')

const app = require('../app')
const User = require('../models/User')

const expect = chai.expect
chai.use(chaiHttp)

let currentAccessToken = ''

const correctInput = {
  name: 'Keanu Reeves',
  email: 'keanu@mail.com',
  password: 'keanu'
}

describe('CRUD users robodyutes', function () {
  this.timeout(5000)

  before(function () {
    chai
      .request(app)
      .post('/users/register')
      .send({
        name: 'initialinput',
        email: 'initialinput@mail.com',
        password: 'initialinput'
      })
      .end(function (err, res) {
        if (err) console.log(err)
        currentAccessToken = res.body.access_token
      })
  })

  after(function () {
    User.deleteMany({}, err => console.log(err))
  })

  describe('Register a user', function () {
    it('should return an access_token from with the message: \'Successfully registered!\'', function (done) {
      chai
        .request(app)
        .post('/users/register')
        .send(correctInput)
        .end(function (err, res) {
          // console.log("ini response dari user register", res.body)
          expect(err).to.be.null
          expect(res).to.have.status(201)

          expect(res.body).to.be.an('object')
          expect(res.body.user).to.be.an('object')
          expect(res.body.message).to.be.a('string')
          expect(res.body.access_token).to.be.a('string')

          expect(res.body.user.name).to.be.a('string')
          expect(res.body.user.email).to.be.a('string')
          expect(res.body.user.password).to.be.a('string')

          done()
        })
    })
  })

  describe('User log in', function () {
    it('should return an access_token from user with the message: \'Successfully logged in!\'', function (done) {
      chai
        .request(app)
        .post('/users/login')
        .send({
          email: correctInput.email, password: correctInput.password
        })
        .end(function (err, res) {
          // console.log("ini response dari user register", res.body)
          currentUserId = res.body.user._id
          currentAccessToken = res.body.access_token
          // console.log("access token pas user log in", currentAccessToken);

          expect(err).to.be.null
          expect(res).to.have.status(200)

          expect(res.body).to.be.an('object')
          expect(res.body.user).to.be.an('object')
          expect(res.body.message).to.be.a('string')
          expect(res.body.access_token).to.be.a('string')

          expect(res.body.user.name).to.be.a('string')
          expect(res.body.user.email).to.be.a('string')
          expect(res.body.user.password).to.be.a('string')

          done()
        })
    })

    it('ERROR: when the user is not found, error message: \'Wrong email/password!\'', function (done) {
      chai
        .request(app)
        .post('/users/login')
        .send({
          email: 'wrong email address', password: correctInput.password
        })
        .end(function (err, res) {
          // console.log("ini response dari user login pas user not found", res.body)
          expect(err).to.be.null
          expect(res).to.have.status(404)

          expect(res.body).to.be.an('object')
          expect(res.body.messages).to.be.an('array')

          done()
        })
    })

    it('ERROR: when the password is wrong, error message: \'Wrong email/password!\'', function (done) {
      chai
        .request(app)
        .post('/users/login')
        .send({
          email: correctInput.email, password: 'wrong password'
        })
        .end(function (err, res) {
          // console.log("ini response dari user login pas salah password", res.body)
          expect(err).to.be.null
          expect(res).to.have.status(404)

          expect(res.body).to.be.an('object')
          expect(res.body.messages).to.be.an('array')

          done()
        })
    })
  })

  describe('Google sign in', function () {
    it('if the user has registered before using google account, should return an access_token with the message: \'Successfully logged in!\'', function (done) {
      // THIS IS GONNA BE HANDLED LATER
    })
  })

  describe('Find a user by id', function () {
    it('should return the currently logged in user', function (done) {
      chai
        .request(app)
        .get(`/users/user`)
        .set('access_token', currentAccessToken)
        .end(function (err, res) {
          console.log("ini response dari user findbyid", res.body)
          expect(err).to.be.null
          expect(res).to.have.status(200)

          done()
        })
    })
    it('ERROR: when user not found should return message: \'Unauthorized access!\'', function (done) {
      const wrongAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkY2FkZjE4NmEyMjgwMjA2M2Q0MTgyZSIsIm5hbWUiOiJyaXNhbnRvIiwiZW1haWwiOiJyaXNhbnRvQG1haWwuY29tIiwiaWF0IjoxNTczNTc2NDczfQ.dGTkMP15gtF7RM7seRtahrsYb-DfTa0YmOAu_HB5p2M'
      
      chai
        .request(app)
        .get(`/users/user`)
        .set('access_token', wrongAccessToken)
        .end(function (err, res) {
          console.log("ini response dari user findbyid", res.body)
          expect(err).to.be.null
          expect(res).to.have.status(401)

          expect(res.body).to.be.an('object')
          expect(res.body.messages).to.be.an('array')

          done()
        })
    })
  })

})
