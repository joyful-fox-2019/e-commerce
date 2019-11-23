const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const User = require('../models/user');

chai.use(chaiHttp);
const expect = chai.expect

let newUser = {
    name: 'kirito',
    password: 'linkstart',
    email: 'kirito@gmail.com',
    role: 'customer'
}

let userSignin = {
    email: newUser.email,
    password: newUser.password
}
//middleware testing
before(function () {
    const data = {
        name: 'asuna',
        email: 'asuna@gmail.com',
        password: 'linkstart',
        role: 'admin'
    }
    User.create(data)
        .then(user => {
            console.log('testing: success create initial user');
        })
        .catch(err => {
            console.log(err)
        })
})
//delete data after testing
after(function (done) {
    // if (process.env.NODE_ENV === 'testing') {
    User.deleteMany({})
        .then(_ => {
            console.log('testing: delete data user success!');
            done()
        })
        .catch(err => {
            console.log(err);
        })
    // }
})

describe('User routes', function () {
    describe('POST /users/signup', function () {
        describe('success process', function () {
            it('should send an object (message) with 201 status code', function (done) {
                chai.request(app)
                    .post('/users/signup')
                    .send(newUser)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(201)
                        done()
                    })
            })
        })
        describe('error process', function () {
            it('should send an error with 400 status code because email not valid', function (done) {
                chai.request(app)
                    .post('/users/signup')
                    .send({
                        name: 'sasuke',
                        password: 'linkstart',
                        email: 'sasugmail.com',
                        role: 'customer'
                    })
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('object')
                        expect(res.body.errors).to.be.an('array')
                        done()
                    })
            })
        })
        describe('error process', function () {
            it('should send an error with 400 status code because missing name value', function (done) {
                const withoutName = {
                    ...newUser
                }
                delete withoutName.name
                chai.request(app)
                    .post('/users/signup')
                    .send(withoutName)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('object')
                        expect(res.body.errors).to.be.an('array')
                        done()
                    })
            })
        })
        describe('error process', function () {
            it('should send an error with 400 status code because missing email value', function (done) {
                const withoutEmail = {
                    ...newUser
                }
                delete withoutEmail.email
                chai.request(app)
                    .post('/users/signup')
                    .send(withoutEmail)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('object')
                        expect(res.body.errors).to.be.an('array')
                        done()
                    })
            })
        })
        describe('error process', function () {
            it('should send an error with 400 status code because missing password value', function (done) {
                const withoutPassword = {
                    ...newUser
                }
                delete withoutPassword.password
                chai.request(app)
                    .post('/users/signup')
                    .send(withoutPassword)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('object')
                        expect(res.body.errors).to.be.an('array')
                        done()
                    })
            })
        })
        describe('error process', function () {
            it('should send an error with 400 status code because duplicate email', function (done) {
                chai.request(app)
                    .post('/users/signup')
                    .send(newUser)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('object')
                        expect(res.body.errors).to.be.an('array')
                        done()
                    })
            })
        })
    })
    describe('POST /users/signin', function () {
        describe('succes process', function () {
            it('should send an object (message) with 200 status code', function (done) {
                chai.request(app)
                    .post('/users/signin')
                    .send(userSignin)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        done()
                    })
            })
        })
        describe('error process', function () {
            it('should send an error with 400 status code because wrong email/password', function (done) {
                chai.request(app)
                    .post('/users/signin')
                    .send({
                        email: 'kir@gmail.com',
                        password: 'siti'
                    })
                    .end(function (err, res) {
                        // console.log(res.body, '===============================')
                        expect(err).to.be.null
                        expect(res).to.have.status(500)
                        expect(res.body).to.be.an('object')
                        expect(res.body.errors).to.be.an('array')
                        done()
                    })
            })
        })
    })
})