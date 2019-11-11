const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const User = require('../models/user');
const { signToken } = require('../helpers/jwt')

chai.use(chaiHttp)
const expect = chai.expect;

let initialId = '';
let initialToken = '';
let initialCode = 'codeini'

let falseId = '748jrp32njnfjfnfdfa'
let falseToken = 'wifjpw3ihgi42-hf924-fji3fj-fji3fjei0fs'

before(function () {
  const data = {
    username: 'Eric S',
    email: 'ericsudhartio@gmail.com',
    password: 'testingchai'
  }
  User.create(data)
    .then(user => {
      initialId = user._id;
      const token = signToken({ id: user._id, username: user.username, email: user.email })
      initialToken = token;
    })
    .catch(console.log)
})

after(function (done) {
  if(process.env.NODE_ENV == 'testing') {
    User.deleteMany({})
      .then(() => {
        console.log('testing: delete data user success!');
        done()
      })
      .catch(console.log)
  }
})


describe('UserRoutes', function () {
  let newUser = {
    username: 'sudhartioeric',
    email: 'sudhartioeric@gmail.com',
    password: 'sudhartioeric'
  }
  this.timeout(10000);


  describe('POST /users/signup', function () {
    let link = '/users/signup';
    describe('success process', function () {
      it('should send an object (user, token) with 201 status code', function (done) {
        chai.request(app)
          .post(link)
          .send(newUser)
          .end(function(err,res) {
            expect(err).to.be.null
            expect(res).to.have.status(201)
            expect(res.body).to.be.an('object').to.have.any.keys('user', 'token', 'msg')
            expect(res.body.msg).to.equal('SignUp succesfully!')
            done()
          })
      })
    })
    describe('error process', function () {
      it('should send an error with 400 status code because missing username value', function (done) {
        const noUsername = { ...newUser };
        delete noUsername.username
        chai.request(app)
          .post(link)
          .send(noUsername)
          .end(function (err,res) {
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('msg', 'errors')
            expect(res.body.msg).to.equal('Validation Error')
            expect(res.body.errors).to.be.an('array').that.includes('username is required!')
            done()
          })
      })
      it('should send an error with 400 status code because missing email value', function (done) {
        const noEmail = { ...newUser }
        delete noEmail.email
        chai.request(app)
          .post(link)
          .send(noEmail)
          .end(function (err,res) {
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('msg', 'errors')
            expect(res.body.msg).to.equal('Validation Error')
            expect(res.body.errors).to.be.an('array').that.includes('email is required!')
            done()
          })
      })
      it('should send an error with 400 status code because missing password value', function (done) {
        const noPass = { ...newUser }
        delete noPass.password;
        chai.request(app)
          .post(link)
          .send(noPass)
          .end(function (err,res) {
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('msg', 'errors')
            expect(res.body.msg).to.equal('Validation Error')
            expect(res.body.errors).to.be.an('array').that.includes('password is required!')
            done()
          })
      })
      it('should send an error with 400 status code because format email invalid', function (done) {
        const falseEmail = { ...newUser, }
        falseEmail.email = 'wrong.com'
        chai.request(app)
          .post(link)
          .send(falseEmail)
          .end(function (err,res) {
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('msg', 'errors')
            expect(res.body.msg).to.equal('Validation Error')
            expect(res.body.errors).to.be.an('array').that.includes('Email invalid format')
            done()
          })
      })
      it('should send an error with 400 status code because min char password', function (done) {
        const newPass = { ...newUser }
        newPass.password = 'hlo'
        chai.request(app)
          .post(link)
          .send(newPass)
          .end(function (err,res) {
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('msg', 'errors')
            expect(res.body.msg).to.equal('Validation Error')
            expect(res.body.errors).to.be.an('array').that.includes('password min 6 char!')
            done()
          })
      })
      it('should send an error with 400 status code because duplicate email', function (done) {
        chai.request(app)
          .post(link)
          .send(newUser)
          .end(function (err,res) {
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('msg', 'errors')
            expect(res.body.msg).to.equal('Validation Error')
            expect(res.body.errors).to.be.an('array').that.includes('Email user is already registered!')
            done()
          })
      })
    })
  })

  const userSignin = {
    request: newUser.email || newUser.username,
    password: newUser.password
  }

  describe('POST /users/signin', function () {
    let link = '/users/signin';
    describe('success process', function () {
      it('should send an object (msg, token, user) with 200 status code', function (done) {
        chai.request(app)
          .post(link)
          .send(userSignin)
          .end(function (err,res) {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object').to.have.any.keys('msg', 'token', 'user')
            expect(res.body.msg).to.equal('Signin Success')
            done()
          })
      })
    })
    describe('error process', function () {
      it('should send an error with 400 beacuse missing request value', function (done) {
        const missRequest = { ...userSignin }
        delete missRequest.request
        chai.request(app)
          .post(link)
          .send(missRequest)
          .end(function (err,res) {
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('msg')
            expect(res.body.msg).to.equal('bad request')
            done()
          })
      })
      it('should send an error with 400 because missing password value', function (done) {
        const missPassword = { ...userSignin }
        delete missPassword.password
        chai.request(app)
          .post(link)
          .send(missPassword)
          .end(function (err,res) {
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('msg')
            expect(res.body.msg).to.equal('bad request')
            done()
          })
      })
      it('should send an error with 403 because wrong request / password', function (done) {
        const loginUser = {
          request: 'toketoke',
          password: 'passpasssword'
        }
        chai.request(app)
          .post(link)
          .send(loginUser)
          .end(function (err,res) {
            expect(err).to.be.null
            expect(res).to.have.status(403)
            expect(res.body).to.be.an('object').to.have.any.keys('msg')
            expect(res.body.msg).to.equal('your request wrong')
            done()
          })
      })
    })
  })

  // describe('POST /users/sendcode', function () {
  //   let link = '/users/sendcode';
  //   const email = newUser.email;
  //   describe('success process', function () {
  //     it('should send an object with 200 status code', function (done) {
  //       chai.request(app)
  //         .post(link)
  //         .set('token', initialToken)
  //         .send(email)
  //         .end(function (err,res) {
  //           expect(err).to.be.null;
  //           expect(res).to.have.status(200)
  //           expect(res.body).to.be.an('object').to.have.any.keys('msg')
  //           done()
  //         })
  //     })
  //   })

  //   describe('error process', function () {
  //     it('should send an error with 403 because token is undefined', function (done) {
  //       chai.request(app)
  //         .post(link)
  //         .send(email)
  //         .end(function(err,res) {
  //           expect(err).to.be.null;
  //           expect(res).to.have.status(403)
  //           expect(res.body).to.be.an('object').to.have.any.keys('msg')
  //           expect(res.body.msg).to.equal('Authentication Error')
  //           done()
  //         })
  //     })
  //     it('should send an error with 400 because invalid token', function (done) {
  //       chai.request(app)
  //         .post(link)
  //         .send(email)
  //         .set('token', falseToken)
  //         .end(function(err,res) {
  //           expect(err).to.be.null;
  //           expect(res).to.have.status(400)
  //           expect(res.body).to.be.an('object').to.have.any.keys('msg')
  //           expect(res.body.msg).to.equal('Invalid Token')
  //           done()
  //         })
  //     })
  //     it('should send an error with 400 because email is undefined', function (done) {
  //       const falseEmail ={x}
  //       chai.request(app)
  //         .post(link)
  //         .send(falseEmail)
  //         .set('token', initialToken)
  //         .end(function (err,res) {
  //           expect(err).to.be.null;
  //           expect(res).to.have.status(400)
  //           expect(res.body).to.be.an('object').to.have.any.keys('msg')
  //           expect(res.body.msg).to.equal('email is required')
  //           done()
  //         })
  //     })
  //   })
  // })





  const updateAddress = {
    address: 'jl.radial'
  }
  describe('PATCH /users', function () {
    let link = `/users`
    describe('success process', function () {
      it('should send an object (user (new Update)) with status 201', function (done) {
        chai.request(app)
          .patch(link)
          .send(updateAddress)
          .set('token', initialToken)
          .end(function (err,res) {
            expect(err).to.be.null
            expect(res).to.have.status(201)
            expect(res.body).to.be.an('object').to.have.any.keys('user')
            expect(res.body.user.address).to.equal(updateAddress.address)
            done()
          })
      })
    })
    describe('error process', function () {
      it('should send an error with status 400 because empty address', function (done) {
        const falseAddress = { address: '' }
        chai.request(app)
          .patch(link)
          .send(falseAddress)
          .set('token', initialToken)
          .end(function (err,res) {
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('msg')
            expect(res.body.msg).to.equal('cannot send empty value address')
            done()
          })
      })
      it('should send an error with status 403 because authentication', function (done) {
        chai.request(app)
          .patch(link)
          .send(updateAddress)
          .end(function (err,res) {
            expect(err).to.be.null
            expect(res).to.have.status(403)
            expect(res.body).to.be.an('object').to.have.any.keys('msg')
            expect(res.body.msg).to.equal('Authentication Error')
            done()
          })
      })
      it('should send an error with status 400 because invalid token', function (done) {
        chai.request(app)
          .patch(link)
          .send(updateAddress)
          .set('token', falseToken)
          .end(function (err,res) {
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('msg')
            expect(res.body.msg).to.equal('Invalid Token')
            done()
          })
      })
    })
  })

  // const verifyCode = {
  //   code: 'codeini'
  // }
  // describe('PATCH /users/verify', function () {
  //   let link = '/users/verify'
  //   describe('success process', function () {
  //     it('should send an object with status 201', function (done) {
  //       chai.request(app)
  //         .patch(link)
  //         .send(verifyCode)
  //         .set('token', initialToken)
  //         .end(function (err,res) {
  //           expect(err).to.be.null
  //           expect(res).to.have.status(201)
  //           expect(res.body).to.be.an('object').to.have.any.keys('msg', 'status')
  //           expect(res.body.msg).to.equal('Your Account now Verified')
  //           done()
  //         })
  //     })
  //   })
  //   describe('error process', function () {
  //     it('should send an error with status 400 because wrong verifycode', function (done) {
  //       const falseCode = {
  //         code: 'wrongcode'
  //       }
  //       chai.request(app)
  //         .patch(link)
  //         .send(falseCode)
  //         .set('token', initialToken)
  //         .end(function (err,res) {
  //           expect(err).to.be.null
  //           expect(res).to.have.status(400)
  //           expect(res.body).to.be.an('object').to.have.any.keys('msg')
  //           expect(res.body.msg).to.equal('Invalid Code Verify')
  //           done()
  //         })
  //     })
  //     it('should send an error with status 400 because invalid token', function (done) {
  //       chai.request(app)
  //         .patch(link)
  //         .send(verifyCode)
  //         .set('token', falseToken)
  //         .end(function (err,res) {
  //           expect(err).to.be.null
  //           expect(res).to.have.status(400)
  //           expect(res.body).to.be.an('object').to.have.any.keys('msg')
  //           expect(res.body.msg).to.equal('Invalid Token')
  //           done()
  //         })
  //     })
  //     it('should send an error with status 403 because token is undefined', function (done) {
  //       chai.request(app)
  //         .patch(link)
  //         .send(verifyCode)
  //         .end(function (err,res) {
  //           expect(err).to.be.null;
  //           expect(res).to.have.status(403);
  //           expect(res.body).to.be.an('object').to.have.any.keys('msg')
  //           expect(res.body.msg).to.equal('Authentication Error')
  //           done()
  //         })
  //     })
  //   })
  // })
})