
const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const token  = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYzllYzAxYjhmNjc0MWE1NTE4NjVkZCIsImVtYWlsIjoidGVzdGluZ0BtYWlsLmNvbSIsImlhdCI6MTU3MzUxNDUyMH0.vZFFoPTbbNqZntMhSFbxcSb59pDSfZfR0_p0zydrTVY'

chai.use(chaiHttp)

const app = require('../app')

const UserModel = require('../models/user')

// after(function(done){
//     UserModel.deleteMany()
//     .then(_ =>{
//         console.log('validation testing completed')
//         done()
//     })
//     .catch(err =>{
//         console.log(err)
//     })
// })


describe('Test e-commerce- User routes', function(){
    describe('Function Register', function(){
        describe('Success response',function(){
            it('should return success when the value is success', function(done){
                chai.request(app).post('/users/signup').send({
                    email : 'tester@mail.com',
                    password : 'tester',
                    role : 'admin',
                    fullname : 'tester'
                }).end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    done()
                })
            })
        })
        describe('Error response', function(){
            it('should return validation error when the email format is incorrect', function(done){
                chai.request(app).post('/users/signup').send({
                    email : 'testermail.com',
                    password : 'tester',
                    role : 'admin',
                    fullname : 'tester'
                }).end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(500)
                    done()
                })
            })
        })
        describe('Error response', function(){
            it('should return validation error when the email is blank', function(done){
                chai.request(app).post('/users/signup').send({
                    email : '',
                    password : 'tester',
                    role : 'admin',
                    fullname : 'tester'
                }).end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(500)
                    done()
                })
            })
        })
        describe('Error response', function(){
            it('should return validation error when the password is blank', function(done){
                chai.request(app).post('/users/signup').send({
                    email : 'tester@mail.com',
                    password : '',
                    role : 'admin',
                    fullname : 'tester'
                }).end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(500)
                    done()
                })
            })
        })
        describe('Error response', function(){
            it('should return validation error when the role is blank', function(done){
                chai.request(app).post('/users/signup').send({
                    email : 'tester@mail.com',
                    password : 'tester',
                    role : '',
                    fullname : 'tester'
                }).end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(500)
                    done()
                })
            })
        })
        describe('Error response', function(){
            it('should return validation error when the fullname is blank', function(done){
                chai.request(app).post('/users/signup').send({
                    email : 'tester@mail.com',
                    password : 'tester',
                    role : 'admin',
                    fullname : ''
                }).end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(500)
                    done()
                })
            })
        })
        describe('Error response',function(){
            it('should return Unique validation error when register same email', function(done){
                chai.request(app).post('/users/signup').send({
                    email : 'tester@mail.com',
                    password : 'tester',
                    role : 'admin',
                    fullname : 'tester'
                }).end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(500)
                    done()
                })
            })
        })
    })
            describe('Function Signin', function(){
                describe('Success response',function(){
                    it('should return success when the value is success', function(done){
                        chai.request(app).post('/users/signin').send({
                            email : 'tester@mail.com',
                            password : 'tester',
                        }).end(function(err,res){
                            expect(err).to.be.null
                            expect(res).to.have.status(200)
                            done()
                        })
                    })
                })
                describe('Error response',function(){
                    it('should return wrong email/password when the password incorrect', function(done){
                        chai.request(app).post('/users/signin').send({
                            email : 'tester@mail.com',
                            password : 'password',
                        }).end(function(err,res){
                            expect(err).to.be.null
                            expect(res).to.have.status(500)
                            done()
                        })
                    })
                })
                describe('Error response',function(){
                    it('should return wrong email/password when the email is incorrect', function(done){
                        chai.request(app).post('/users/signin').send({
                            email : 'not-tester@mail.com',
                            password : 'tester',
                        }).end(function(err,res){
                            expect(err).to.be.null
                            expect(res).to.have.status(500)
                            done()
                        })
                    })
                })
            })
})