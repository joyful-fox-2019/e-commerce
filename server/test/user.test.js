// const chai = require('chai')
// const chaiHttp = require('chai-http')
// const app = require('../app')
// const { User } = require('../models')

// chai.use(chaiHttp)
// const expect = chai.expect

// after(function(done) {
//     if (process.env.NODE_ENV === 'testing') {
//         User.deleteMany()
//             .then(_ => {
//                 console.log('testing: delete data user succes!');  
//             })
//             .catch(console.log)
//     }
//     done()
// })


// describe('User Routes', function() {
//     describe('POST /users/signup', function() {
//         describe('success process', function() {
//             it('should send an object (newUser, message) with 201 status code', function(done) {
//                 chai.request(app)
//                 .post('/click/users/signup')
//                 .send({
//                     name: 'test',
//                     email: 'test@test.com',
//                     password: '12345678',
//                     role: 'customer'
//                 })
//                 .end(function(err, res) {
//                     expect(err).to.be.null
//                     expect(res).to.have.status(201)
//                     expect(res.body).to.be.an('object').to.have.any.keys('newUser','message')
//                     expect(res.body.message).to.equal('success sign up')
//                     done()
//                 })
//             })
//         })
//         describe('errors process', function() {
//             it ('should send error with 400 status code because missing name value', function(done){
//                 chai.request(app)
//                 .post('/click/users/signup')
//                 .send({
//                     name: '',
//                     email: 'test@test.com',
//                     password: '12345678',
//                     role: 'customer'
//                 })
//                 .end(function (err, res) {
//                     expect(err).to.be.null
//                     expect(res).to.have.status(400)
//                     expect(res.body.error).to.be.an('array').that.includes('name is required')
//                     done()
//                 })
//             })
//             it ('should send error with 400 status code because missing email value', function(done){
//                 chai.request(app)
//                 .post('/click/users/signup')
//                 .send({
//                     name: 'test',
//                     email: '',
//                     password: '12345678',
//                     role: 'customer'
//                 })
//                 .end(function (err, res) {
//                     expect(err).to.be.null
//                     expect(res).to.have.status(400)
//                     expect(res.body.error).to.be.an('array').that.includes('email is required')
//                     done()
//                 })
//             })
//             it ('should send error with 400 status code because invalid email format', function(done){
//                 chai.request(app)
//                 .post('/click/users/signup')
//                 .send({
//                     name: 'test',
//                     email: 'test@',
//                     password: '12345678',
//                     role: 'customer'
//                 })
//                 .end(function(err, res) {
//                     expect(err).to.be.null
//                     expect(res).to.have.status(400)
//                     expect(res.body.error).to.be.an('array').that.includes('invalid email format')
//                     done()
//                 })
//             })
//             it ('should send error with 400 status code because email already registered', function(done) {
//                 chai.request(app)
//                 .post('/click/users/signup')
//                 .send({
//                     name: 'test',
//                     email: 'test@test.com',
//                     password: '12345678',
//                     role: 'customer'
//                 })
//                 .end(function(err, res) {
//                     expect(err).to.be.null
//                     expect(res).to.have.status(400)
//                     expect(res.body.error).to.be.an('array').that.includes('email already registered')
//                     done()
//                 })
//             })
//             it ('should send error with 400 status code because missing password value', function(done) {
//                 chai.request(app)
//                 .post('/click/users/signup')
//                 .send({
//                     name: 'test',
//                     email: 'test@test.com',
//                     password: '',
//                     role: 'customer'                   
//                 })
//                 .end(function(err, res) {
//                     expect(err).to.be.null
//                     expect(res).to.have.status(400)
//                     expect(res.body.error).to.be.an('array').that.includes('password required')
//                     done()
//                 })
//             })
//             it ('should send error with 400 status code because password less than 8 char', function(done){
//                 chai.request(app)
//                 .post('/click/users/signup')
//                 .send({
//                     name: 'test',
//                     email: 'test@test.com',
//                     password: '1234567',
//                     role: 'customer'                  
//                 })
//                 .end(function(err, res) {
//                     expect(err).to.be.null
//                     expect(res).to.have.status(400)
//                     expect(res.body.error).to.be.an('array').that.includes('password min 8 char')
//                     done()
//                 })
//             })
//             it ('should send error with 400 status code because missing all value', function(done){
//                 chai.request(app)
//                 .post('/click/users/signup')
//                 .send({
//                     name: '',
//                     email: '',
//                     password: '',
//                     role: ''                  
//                 })
//                 .end(function(err, res) {
//                     expect(err).to.be.null
//                     expect(res).to.have.status(400)
//                     expect(res.body.error).to.be.an('array').that.includes("name is required", "email is required", " invalid email format", "email already registered", "password required", "password min 8 char")
//                     done()
//                 })
//             })
//         })
//     })
//     describe('POST /users/signin', function() {
//         describe('succes process', function() {
//             it('should send an object (message, token) with 200 status code', function(done) {
//                 chai.request(app)
//                 .post('/click/users/signin')
//                 .send({
//                     identity: 'test',
//                     password: '12345678'
//                 })
//                 .end(function(err, res) {
//                     expect(err).to.be.null
//                     expect(res).to.have.status(200)
//                     expect(res.body).to.be.an('object').to.have.any.keys('message','token', user)
//                     expect(res.body.message).to.equal('success sign in')
//                     done()
//                 })
//             })
//         })
//         describe('errors process', function() {
//             it('should send error with status code 400 because missing identity value', function(done) {
//                 chai.request(app)
//                 .post('/click/users/signin')
//                 .send({
//                     identity: '',
//                     password: '12345678'                  
//                 })
//                 .end(function(err, res) {
//                     expect(err).to.be.null
//                     expect(res).to.have.status(400)
//                     expect(res.body.error).to.be.an('array').that.includes("identity required")
//                     done()
//                 })
//             })
//             it('should send error with status code 400 because missing password value', function(done) {
//                 chai.request(app)
//                 .post('/click/users/signin')
//                 .send({
//                     identity: 'test',
//                     password: ''                  
//                 })
//                 .end(function(err, res) {
//                     expect(err).to.be.null
//                     expect(res).to.have.status(400)
//                     expect(res.body.error).to.be.an('array').that.includes("password required")
//                     done()
//                 })
//             })
//             it('should send error with status code 400 because identity invalid', function(done) {
//                 chai.request(app)
//                 .post('/click/users/signin')
//                 .send({
//                     identity: 'testi',
//                     password: '12345678'                  
//                 })
//                 .end(function(err, res) {
//                     expect(err).to.be.null
//                     expect(res).to.have.status(400)
//                     expect(res.body.error).to.be.an('array').that.includes("invalid email/password")
//                     done()
//                 })
//             })
//             it('should send error with status code 400 because password invalid', function(done) {
//                 chai.request(app)
//                 .post('/click/users/signin')
//                 .send({
//                     identity: 'test',
//                     password: '1234567'                  
//                 })
//                 .end(function(err, res) {
//                     expect(err).to.be.null
//                     expect(res).to.have.status(400)
//                     expect(res.body.error).to.be.an('array').that.includes("invalid email/password")
//                     done()
//                 })
//             })
//         })        
//     })
// })