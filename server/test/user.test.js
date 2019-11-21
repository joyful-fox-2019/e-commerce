const chai  = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app.js')
const userModel = require('../models/user')
const expect = chai.expect
const fs = require('fs')

chai.use(chaiHttp)

const userSignUp = {
    name : 'mail bin mail',
    email : 'mail@mail.com',
    password : 'mailsimail',
    imgUrl : './img/profil_avatdwdar.jpg',
    role : 'customer'
}

const userSignIn = {
    email : 'mail@mail.com',
    password : 'mailsimail'
}

// create account user
// before(function(){
//     userModel.create({
//         name : 'ipin bin upin',
//         email : 'mail@mail.com',
//         password : 'mailsimail',
//         imgUrl : './img/profil_avatdwdar.jpg'
//     })
//     .then(user=>{ console.log('testing: success create user') })
//     .catch(console.log)
// })

// delete data after testing
after(function(done){
    userModel.deleteMany({})
        .then(()=>{
            console.log(`testing: delete all data users success`);
            done()
        })
        .catch(console.log)
})

// process validation with mochajs
describe('User Routes',function(){
    describe('POST /user/signup',function(){
        describe('success process',function(){
            // this.timeout(15000);
            it('create user with 201 status code',function(done){
                // this.timeout(15000);
                // setTimeout(done, 15000);
                chai.request(app)
                .post('/user/signup')
                .field('name', userSignUp.name)
                .field('email', userSignUp.email)
                .field('password', userSignUp.password)
                .field('role', userSignUp.role)
                .attach('imgUrl', fs.readFileSync("./test/img/profil_avatdwdar.jpg"), "profil_avatdwdar.jpg")
                .end(function(err,res){
                    imgUrl = res.body.imgUrl
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    done()
                })
            })
        })
        describe('error process without name',function(){
            it('create user with 400 status code without name',function(done){
                chai.request(app)
                .post('/user/signup')
                .field('email', userSignUp.email)
                .field('password', userSignUp.password)
                .field('role', userSignUp.role)
                .attach('imgUrl', fs.readFileSync("./test/img/profil_avatdwdar.jpg"), "profil_avatdwdar.jpg")
                .end(function(err,res){
                    imgUrl = res.body.imgUrl
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body.message).to.equal('Validation Error')
                    expect(res.body.errors).to.be.an('array').that.includes('name is required')
                    done()
                })
            })
        })
        describe('error process without email',function(){
            it('create user with 400 status code without email',function(done){
                chai.request(app)
                .post('/user/signup')
                .field('name', userSignUp.name)
                .field('password', userSignUp.password)
                .field('role', userSignUp.role)
                .attach('imgUrl', fs.readFileSync("./test/img/profil_avatdwdar.jpg"), "profil_avatdwdar.jpg")
                .end(function(err,res){
                    imgUrl = res.body.imgUrl
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body.message).to.equal('Validation Error')
                    expect(res.body.errors).to.be.an('array').that.includes('email is required')
                    done()
                })
            })
        })
        describe('error process without password',function(){
            it('create user with 400 status code without password',function(done){
                chai.request(app)
                .post('/user/signup')
                .field('name', userSignUp.name)
                .field('email', userSignUp.email)
                .field('role', userSignUp.role)
                .attach('imgUrl', fs.readFileSync("./test/img/profil_avatdwdar.jpg"), "profil_avatdwdar.jpg")
                .end(function(err,res){
                    imgUrl = res.body.imgUrl
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body.message).to.equal('Validation Error')
                    expect(res.body.errors).to.be.an('array').that.includes('password is required')
                    done()
                })
            })
        })
        describe('error process with password less than 4 character',function(){
            it('create user with 400 status code password less than 4 character',function(done){
                chai.request(app)
                .post('/user/signup')
                .field('name', userSignUp.name)
                .field('email', userSignUp.email)
                .field('password', 'tes')
                .field('role', userSignUp.role)
                .attach('imgUrl', fs.readFileSync("./test/img/profil_avatdwdar.jpg"), "profil_avatdwdar.jpg")
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body.message).to.equal('Validation Error')
                    expect(res.body.errors).to.be.an('array').that.includes('Password Minimum Contain 4 Character')
                    done()
                })
            })
        })
    })
    describe('POST /user/signin',function(){
        describe('succes login with 200 status code',function(){
            it('login user success',function(done){
                chai.request(app)
                .post('/user/signin')
                .send(userSignIn)
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    done()
                })
            })
        })
        describe('failed login without email',function(){
            it('login failed without email',function(done){
                const withoutEmailLogin = { ...userSignIn }
                delete withoutEmailLogin.email
                chai.request(app)
                .post('/user/signin')
                .send(withoutEmailLogin)
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(404)
                    expect(res.body.errors).to.be.an('array').that.includes('Email Not Found')
                    done()
                })
            })
        })
        describe('failed login with wrong password',function(){
            it('login failed with wrong password',function(done){
                const withoutPassLogin = { ...userSignIn }
                withoutPassLogin.password = 'asas'
                chai.request(app)
                .post('/user/signin')
                .send(withoutPassLogin)
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    done()
                })
            })
        })
    })
})