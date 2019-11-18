const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const fs = require("fs")
const User = require('../models/user')

chai.use(chaiHttp)
const expect = chai.expect

let adminToken = null
let file = fs.readFileSync("./test/test.jpg")

// Create User Account to Database
before(function (done) {
  const adminData = {
    name: 'admin',
    email: 'upload@admin.com',
    password: 'ecommerce',
    isAdmin: true,
    city: 'Jakarta'
  }
  User.create(adminData)
    .then(users => {
      console.log('testing: success create initial user')
      done()
    })
    .catch(console.log)
})

// Clear Database After Testing
after(function (done) {
  if (process.env.NODE_ENV === 'testing') {
    User.deleteMany({})
      .then(() => {
        console.log('testing: delete data user success!')
        done()
      })
      .catch(console.log)
  }
})

describe('Give Access Token to Admin for Testing', function () {
  it('should give status 200 and access token to admin', function (done) {
    let user = {
      'email': 'upload@admin.com',
      'password': 'ecommerce'
    }
    chai
      .request(app)
      .post('/users/login')
      .send(user)
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        adminToken = res.body.access_token
        done();
      })
  })
})

describe('Simulate Google Upload', function () {
  it('should give status 200 and uploaded image url', function (done) {
    this.timeout(10000)
    chai
      .request(app)
      .post('/upload')
      .set('access_token', adminToken)
      .type('form')
      .attach("image", file, "test.jpg")
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.any.keys('status', 'message', 'link')
        done()
      })
  })
})