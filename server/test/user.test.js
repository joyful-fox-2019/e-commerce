const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const User = require('../models/User')
const { generateToken } = require('../helpers/jwt')

chai.use(chaiHttp)
const expect = chai.expect

let token = null
let newUser = {
    email: 'uzai@uzai.com',
    password: 'uzai',
    address: 'Tokyo'
}
let newUserUpdate ={
    firstName: 'Sasuke',
    lastName: 'Itachi',
    addres: 'Konoha',
    file: 'shout be an image'
}

// model testing

before(function(done){
    const data = {
        email: 'before@before.com',
        password: 'before',
        address: 'Tokyo'
    }
    User.create(data)
        .then(user =>{
            token = generateToken({
                id: user._id
            })
            console.log('testing: success create initial user');
            done()
        })
        .catch(console.log)
})

// delete data after testing
after(function(done){
    User.deleteMany({})
        .then(()=>{
            console.log('testing: delete data user success!')
            done()
        })
        .catch(console.log)
})

describe('User Routes', function(){
    describe(' POST /users/register', function(){
        describe('Success Register', function(){

            it('should return an object ( token ) with satus code 201', function(done){
                chai.request(app)
                .post('/users/register')
                .send(newUser)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an('object').to.have.key('token')
                    done()
                })
            })

        })
        describe('Error Register', function(){
            it('should send an error with status code 400 because empty email', function(done) {
                const withoutEmail = { ...newUser }
                delete withoutEmail.email
                chai.request(app)
                .post('/users/register')
                .send(withoutEmail)
                .end(function(err, res) {
                  expect(err).to.be.null
                  expect(res).to.have.status(400)
                  expect(res.body).to.be.an('object').to.have.any.keys('message')
                  expect(res.body.message).to.be.an('array').that.includes('Email is required')
                  done()
                })
              })

              it('should send an error with status code 400 because empty password', function(done) {
                const withoutPass = { ...newUser }
                delete withoutPass.password
                chai.request(app)
                .post('/users/register')
                .send(withoutPass)
                .end(function(err, res) {
                  expect(err).to.be.null
                  expect(res).to.have.status(400)
                  expect(res.body).to.be.an('object').to.have.any.keys('message')
                  expect(res.body.message).to.be.an('array').that.includes('Password is required')
                  done()
                })
              })

              it('should send an error with status code 400 because email is invalid', function(done) {
                const invalidEmail = { ...newUser, email: 'no.an.email.com' }
                chai.request(app)
                .post('/users/register')
                .send(invalidEmail)
                .end(function(err, res) {
                  expect(err).to.be.null
                  expect(res).to.have.status(400)
                  expect(res.body).to.be.an('object').to.have.any.keys('message')
                  expect(res.body.message).to.be.an('array').that.includes('Email is not valid')
                  done()
                })
              })
              
              it('should send an error with status code 400 because duplicate email', function(done){
                chai.request(app)
                .post('/users/register')
                .send(newUser)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object').to.have.any.keys('message')
                    expect(res.body.message).to.be.an('array').that.includes(`${newUser.email} is already used by another user`)
                    done()
                })
            })
        })
    })

    describe('POST /users/login', function(){
        
        describe('Success Login', function(){
            it('should return an object ( token ) with satus code 200', function(done){
                chai.request(app)
                .post('/users/login')
                .send(newUser)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object').to.have.key('token')
                    done()
                })
            })
        })

        describe('Error Login', function(){
            it('should return an error with status code 400 because wrong email', function(done){
                const invalidEmail = { ...newUser, email: 'no.an.email.com' }
                chai.request(app)
                .post('/users/login')
                .send(invalidEmail)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object').to.have.any.keys('message')
                    expect(res.body.message).to.be.an('string').that.includes('password or email is wrong')
                    done()
                })
            })

            it('should return an error with status code 400 because wrong password', function(done){
                const invalidPass = { ...newUser, password: 'not password' }
                chai.request(app)
                .post('/users/login')
                .send(invalidPass)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object').to.have.any.keys('message')
                    expect(res.body.message).to.be.an('string').that.includes('password or email is wrong')
                    done()
                })
            })

            it('should send an error with status code 400 because empty password', function(done) {
                const withoutPass = { ...newUser }
                delete withoutPass.password
                chai.request(app)
                .post('/users/login')
                .send(withoutPass)
                .end(function(err, res) {
                  expect(err).to.be.null
                  expect(res).to.have.status(400)
                  expect(res.body).to.be.an('object').to.have.any.keys('message')
                  expect(res.body.message).to.equal('bad request')
                  done()
                })
              })

              it('should send an error with status code 400 because empty email', function(done) {
                const withoutEmail = { ...newUser }
                delete withoutEmail.email
                chai.request(app)
                .post('/users/login')
                .send(withoutEmail)
                .end(function(err, res) {
                  expect(err).to.be.null
                  expect(res).to.have.status(400)
                  expect(res.body).to.be.an('object').to.have.any.keys('message')
                  expect(res.body.message).to.equal('bad request')
                  done()
                })
              })

        })
    })

    describe('PATCH /users', function(){
        describe('Success Update Profile', function(){
            it('update user profile', function(done) {
                chai.request(app)
                .patch('/users/test')
                .set('token', token)
                .send(newUserUpdate)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    done()
                })
            })
        })

        describe('Error Update Profile', function(){
            it('should send an error with status code 400 because not login', function(done) {
                chai.request(app)
                .patch('/users/test')
                .send(newUserUpdate)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object').to.have.any.keys('message')
                    expect(res.body.message).to.be.an('string').that.includes('please login first')
                    done()
                })
            })
        })
    })
})