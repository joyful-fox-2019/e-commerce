const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const User = require('../models/user')

chai.use(chaiHttp)
const expect = chai.expect

let newUser = {
    username: 'andreas',
    email: "andre@mail.com",
    password: 'qwe'
}
let userLogin = {
    username: newUser.username,
    email: newUser.email,
    password: newUser.password
}

before(function() {
    const data = {
        username: 'milotic',
        email: "milotic@mail.com",
        password: '123'
    }
    User.create(data)
        .then( user => console.log(`testing: success creating initial user`))
        .catch(console.log)
})

after(function(done) {
    if(process.env.NODE_ENV === 'testing') {
        User.deleteMany({})
            .then(() => {
                console.log(`testing: success delete user data`)
                done()
            })
            .catch(console.log)
    }
})

describe('Users Endpoints', function() {
    describe('Register User', function() {
        describe('success process', function() {
            it('should return status 201 when sign up success', function(done) {
                chai
                    .request(app)
                    .post('/users/register')
                    .send(newUser)
                    .end(function(err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(201)
                        done()
                    })
            })
        })
        describe('error process', function() {
            it('should return status 400 when email format is invalid', function(done) {
                const invalidEmailFormat = { ...newUser, email: 'wrongFormatmail.com'}
                chai
                    .request(app)
                    .post('/users/register')
                    .send(invalidEmailFormat)
                    .end(function(err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        done()
                    })
            })
            it('should return status 400 when email is duplicated', function(done) {
                chai
                    .request(app)
                    .post('/users/register')
                    .send(newUser)
                    .end(function(err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        done()
                    })
            })
            it('should return status 400 when username is duplicated', function(done) {
                const duplicatedUsername = { ...newUser, email: 'anothermail@mail.com'}

                chai
                    .request(app)
                    .post('/users/register')
                    .send(duplicatedUsername)
                    .end(function(err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        done()
                    })
            })
        })
    })
    describe('Sign In User', function() {
        describe('success process', function() {
            it('should return status 200 and token when sign in success', function(done) {
                chai
                    .request(app)
                    .post('/users/login')
                    .send(userLogin)
                    .end(function(err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        expect(res.body).to.have.own.property('token')
                        done()
                    })
            })
        })
        describe('error process', function() {
            it('should return status 400 when email is missing', function(done) {
                const missingEmail = { ...userLogin }
                delete missingEmail.email
                chai
                    .request(app)
                    .post('/users/login')
                    .send(missingEmail)
                    .end(function(err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body.message).to.equal('bad request')
                        done()
                    })
            })
            it('should return status 400 when password is missing', function(done) {
                const missingPassword = { ...userLogin }
                delete missingPassword.password
                chai
                    .request(app)
                    .post('/users/login')
                    .send(missingPassword)
                    .end(function(err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body.message).to.equal('bad request')
                        done()
                    })
            }) 
            it('should return status 404 when entered a wrong email', function(done) {
                const wrongEmail = { ...userLogin }
                wrongEmail.email = 'lmfao@mail.com'
                chai
                    .request(app)
                    .post('/users/login')
                    .send(wrongEmail)
                    .end(function(err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(404)
                        expect(res.body.message).to.equal('Invalid Email or Password')
                        done()
                    })
            })
            it('should return status 404 when entered wrong password', function(done) {
                const wrongPassword = { ...userLogin }
                wrongPassword.password = 'rty'
                chai
                    .request(app)
                    .post('/users/login')
                    .send(wrongPassword)
                    .end(function(err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(404)
                        expect(res.body.message).to.equal('Invalid Email or Password')
                        done()
                    })
            }) 
        })
    })
})