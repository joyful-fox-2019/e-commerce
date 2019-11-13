const chai = require('chai')
    , chaiHttp = require('chai-http')
    , User = require('../models/User')

chai.use(chaiHttp)
const expect = chai.expect

const app = require('../app')

let userData = {
    name: 'arnold',
    email: 'arnold@mail.com',
    password: 'Google123'
}
// let userData = {
//     name: 'admin',
//     email: 'admin@mail.com',
//     password: 'Admin123'
// }

let userDataLogin = {
    email: 'arnold@mail.com',
    password: 'Google123'
}

after(function(done){
    if(process.env.NODE_ENV === 'test') {
        User.deleteMany({})
            .then(_=>{
                console.log('user data deleted 💔')
                done()
            })
            .catch(console.log)
    }
})

describe('User Routes', function() {
    describe('POST /users/register',function() {
        describe('Success Process 😎',function() {
            it('🔔 should return an object (token,email,name,_id) with status code 201',function(done) {
                chai.request(app)
                .post('/users/register')
                .send(userData)
                .end(function(err,res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an('object').to.have.any.keys('name','email','password')
                    done()
                })
            })
        })
        describe('Error Process ⛔️',function() {
            it('🔔 should return an object (message) with status code 400 because missing name value', function(done) {
                const emptyName = { ...userData }
                delete emptyName.name
                chai.request(app)
                .post('/users/register')
                .send(emptyName)
                .end(function(err,res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object').to.have.any.keys('message')
                    expect(res.body.message).to.be.an('array').that.includes('name is required') 
                    done()
                })
            })
            it('🔔 should return an object (message) with status code 400 because missing email value', function(done) {
                const emptyEmail = { ...userData }
                delete emptyEmail.email
                chai.request(app)
                .post('/users/register')
                .send(emptyEmail)
                .end(function(err,res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object').to.have.any.keys('message')
                    expect(res.body.message).to.be.an('array').that.includes('email is required') 
                    done()
                })
            })
            it('🔔 should return an object (message) with status code 400 because missing password value', function(done) {
                const emptyPassword = { ...userData }
                delete emptyPassword.password
                chai.request(app)
                .post('/users/register')
                .send(emptyPassword)
                .end(function(err,res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object').to.have.any.keys('message')
                    expect(res.body.message).to.be.an('array').that.includes('password is required') 
                    done()
                })
            })
            it('🔔 should return an object (message) with status code 400 because missing name,email,password', function(done) {
                const emptyData = { ...userData }
                delete emptyData.name
                delete emptyData.email
                delete emptyData.password
                chai.request(app)
                .post('/users/register')
                .send(emptyData)
                .end(function(err,res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object').to.have.any.keys('message')
                    expect(res.body.message).to.be.an('array').that.includes('name is required','email is required','password is required') 
                    done()
                })
            })
            it('🔔 should return an object (message) with status code 400 because invalid email format', function(done) {
                const invalidEmail = { ...userData,email: 'invalid.com'}
                chai.request(app)
                .post('/users/register')
                .send(invalidEmail)
                .end(function(err,res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object').to.have.any.keys('message')
                    expect(res.body.message).to.be.an('array').that.includes('invalid email format') 
                    done()
                })
            })
            it('🔔 should return an object (message) with status code 400 because error password validation', function(done) {
                const invalidPass = { ...userData,password: '123'}
                chai.request(app)
                .post('/users/register')
                .send(invalidPass)
                .end(function(err,res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object').to.have.any.keys('message')
                    expect(res.body.message).to.be.an('array').that.includes('password shold contain at least one digit, one lower case , one upper case , minumum 5 char') 
                    done()
                })
            })
            it('🔔 should return an object (message) with status code 400 because email duplication data', function(done) {
                chai.request(app)
                .post('/users/register')
                .send(userData)
                .end(function(err,res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object').to.have.any.keys('message')
                    expect(res.body.message).to.equal('email is already been used') 
                    done()
                })
            })
        })
    })
    describe('POST /users/login',function() {
        describe('Success Process 😎', function() {
            it('🔔 should return an object (token,email,name,_id) with status code 201',function(done) {
                chai.request(app)
                .post('/users/login')
                .send(userDataLogin)
                .end(function(err,res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an('object').to.have.any.keys('name','email','password')
                    done()
                })
            })
        })
        describe('Error Process ⛔️', function() {
            it('🔔 should return an object (message) with status code 400 because invalid email', function(done) {
                const wrongPassEmail = { ...userDataLogin,email: 'arnold'}
                chai.request(app)
                .post('/users/login')
                .send(wrongPassEmail)
                .end(function(err,res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object').to.have.any.keys('message')
                    expect(res.body.message).to.equal('invalid email/password')                     
                    done()
                })
            })
            it('🔔 should return an object (message) with status code 400 because invalid password', function(done) {
                const wrongPassEmail = { ...userDataLogin,password: '123'}
                chai.request(app)
                .post('/users/login')
                .send(wrongPassEmail)
                .end(function(err,res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object').to.have.any.keys('message')
                    expect(res.body.message).to.equal('invalid email/password')                     
                    done()
                })
            })
            it('🔔 should return an object (message) with status code 400 because missing email value', function(done) {
                const emptyEmail = { ...userDataLogin }
                delete emptyEmail.email
                chai.request(app)
                .post('/users/register')
                .send(emptyEmail)
                .end(function(err,res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object').to.have.any.keys('message')
                    expect(res.body.message).to.be.an('array').that.includes('email is required') 
                    done()
                })
            })
            it('🔔 should return an object (message) with status code 400 because missing password value', function(done) {
                const emptyPassword = { ...userDataLogin }
                delete emptyPassword.password
                chai.request(app)
                .post('/users/register')
                .send(emptyPassword)
                .end(function(err,res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object').to.have.any.keys('message')
                    expect(res.body.message).to.be.an('array').that.includes('password is required') 
                    done()
                })
            })  
        })
    })
})