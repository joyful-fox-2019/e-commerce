const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const User = require('../models/user')

chai.use(chaiHttp)

before(function () {
    User.create({
            name: 'dexter',
            email: 'dex@dex.com',
            password: '1234567',
            full_address: 'jalan kenari'
        })
        .then(() => {
            console.log('dummy user created')
        })
        .catch(err => {
            console.log(err)
        })
})

after(function (done) {
    User.deleteMany({})
        .then(() => {
            done()
            console.log('delete success')
        })
        .catch(err => {
            console.log(err)
        })
})
describe('CRUD Users', function () {
    describe('Register User', function () {
        describe('success', function () {
            it('Should return status 201 after sign up success', function (done) {
                chai
                    .request(app)
                    .post('/users/register')
                    .send({
                        name: 'dexter',
                        email: 'halo@halo.com',
                        password: '1234567',
                        full_address: 'jalan kenari'
                    })
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(201)
                        done()
                    })
            })
        })
        describe('error', function () {
            it('should return status 400 because empty name field', function (done) {
                chai
                    .request(app)
                    .post('/users/register')
                    .send({
                        email: 'halo@halo.com',
                        password: '1234567',
                        full_address: 'jalan kenari'
                    })
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        done()
                    })
            })
            it('should return status 400 because empty email field', function (done) {
                chai
                    .request(app)
                    .post('/users/register')
                    .send({
                        name: 'dexter',
                        password: '1234567',
                        full_address: 'jalan kenari'
                    })
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        done()
                    })
            })
            it('should return status 400 because empty password field', function (done) {
                chai
                    .request(app)
                    .post('/users/register')
                    .send({
                        name: 'dexter',
                        email: 'halo@halo.com',
                        full_address: 'jalan kenari'
                    })
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        done()
                    })
            })
            it('should return status 400 because empty address field', function (done) {
                chai
                    .request(app)
                    .post('/users/register')
                    .send({
                        name: 'dexter',
                        email: 'halo@halo.com',
                        password: '1234567'
                    })
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        done()
                    })
            })
            it('should return status 400 because invalid name format', function (done) {
                chai
                    .request(app)
                    .post('/users/register')
                    .send({
                        name: 'dexte23r',
                        email: 'halo@halo.com',
                        password: '1234567',
                        full_address: 'jalan kenari'
                    })
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        done()
                    })
            })
            it('should return status 400 because invalid email format', function (done) {
                chai
                    .request(app)
                    .post('/users/register')
                    .send({
                        name: 'dexter',
                        email: 'dexdex.com',
                        password: '1234567',
                        full_address: 'jalan kenari'
                    })
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        done()
                    })
            })
            it('should return status 400 because min password length', function (done) {
                chai
                    .request(app)
                    .post('/users/register')
                    .send({
                        name: 'dexter',
                        email: 'halo@halo.com',
                        password: '123456',
                        full_address: 'jalan kenari'
                    })
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        done()
                    })
            })
            it('should return status 400 because min address length', function (done) {
                chai
                    .request(app)
                    .post('/users/register')
                    .send({
                        name: 'dexter',
                        email: 'halo@halo.com',
                        password: '123456',
                        full_address: 'jala'
                    })
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        done()
                    })
            })
            it('should return status 400 because duplicate email', function (done) {
                chai
                    .request(app)
                    .post('/users/register')
                    .send({
                        name: 'dexter',
                        email: 'dex@dex.com',
                        password: '1234567',
                        full_address: 'jalan kenari'
                    })
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        done()
                    })
            })
        })
    })
    describe('Login User', function () {
        describe('success', function () {
            it('should return status 200 after successfull login', function (done) {
                chai
                    .request(app)
                    .post('/users/login')
                    .send({
                        email: 'dex@dex.com',
                        password: '1234567',
                    })
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        expect(res.body).to.be.an('object')
                        expect(res.body.message).to.equal('Successfull login')
                        done()
                    })
            })
        })
        describe('error', function () {
            it('should return status 403 because wrong password', function (done) {
                chai
                    .request(app)
                    .post('/users/login')
                    .send({
                        email: 'dex@dex.com',
                        password: '12345',
                    })
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(403)
                        expect(res.body.message).to.equal('Wrong username/password')
                        done()
                    })
            })
            it('should return status 404 because empty email field', function (done) {
                chai
                    .request(app)
                    .post('/users/login')
                    .send({
                        password: '1234567'
                    })
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(404)
                        expect(res.body.message).to.equal('User not found')
                        done()
                    })
            })
            it('should return status 404 because user not exists', function (done) {
                chai
                    .request(app)
                    .post('/users/login')
                    .send({
                        email: 'nuel@mail.com',
                        password: '1234567'
                    })
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(404)
                        expect(res.body.message).to.equal('User not found')
                        done()
                    })
            })
            it('should return status 404 because empty password field', function (done) {
                chai
                    .request(app)
                    .post('/users/login')
                    .send({
                        email: 'dex@dex.com'
                    })
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(404)
                        expect(res.body.message).to.equal('User not found')
                        done()
                    })
            })
        })
    })
})