const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const User = require('../models/user')
const Product = require('../models/product')
const generateToken = require('../helpers/generateToken')

chai.use(chaiHttp)
const expect = chai.expect

let token = ''

before(function(done) {
    const data = {
        name: 'gintoki',
        email: 'gintoki@mail.com',
        password: 'gintoki',
        address: 'Kuningan'
    }

    User.create(data) 
        .then(user => {
            const payload = {
                id: user._id,
                name: user.name,
                email: user.email,
                address: user.email
            }
            token = generateToken(payload)
            console.log('Users data for testing is created')
        })
        .catch(console.log)
        .finally(() => {
            done()
        })
})

after(function(done) {
    if(process.env.NODE_ENV == 'testing') {
        User.deleteMany({})
            .then( () => {
                console.log('User is deleted after testing')
                done()
            })
            .catch(console.log)
    }
})

describe('Product Routes', function() {
    describe('POST /posts', function() {
        describe('SuccessProcess', function() {
            it('Should send an object (product, msg) with 201 status code', function(done) {
                chai.request(app)
                .post('/products')
                .set('token', token)
                .send({
                    name: 'Gintama',
                    description: 'One of the GOATs',
                    img: 'Gintoki',
                    stock: 2,
                    price: 100
                })
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an('object').to.have.any.keys('product', 'msg')
                    expect(res.body.msg).to.equal('New product is successfully added')
                    done()
                })
            })
        })

        describe('ErrorProcess', function() {
            it('Should send an error with 400 status code because missing name value', function(done) {
                chai.request(app)
                .post('/products')
                .set('token', token)
                .send({
                    name: '',
                    description: 'One of the GOATs',
                    img: 'Gintoki',
                    stock: 2,
                    price: 100
                })
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object').to.have.any.keys('msg', 'errors')
                    expect(res.body.msg).to.equal('Validation Error')
                    expect(res.body.errors).to.be.an('array').that.includes('Name is required')
                    done()
                })
            });

            it('Should send an error with 400 status code because missing stock value', function(done) {
                chai.request(app)
                .post('/products')
                .set('token', token)
                .send({
                    name: 'Gintama',
                    description: 'One of the GOATs',
                    img: 'Gintoki',
                    stock: null,
                    price: 100
                })
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object').to.have.any.keys('msg', 'errors')
                    expect(res.body.msg).to.equal('Validation Error')
                    expect(res.body.errors).to.be.an('array').that.includes('Stock is required')
                    done()
                })
            });

            it('Should send an error with 400 status code because missing price value', function(done) {
                chai.request(app)
                .post('/products')
                .set('token', token)
                .send({
                    name: 'Gintama',
                    description: 'One of the GOATs',
                    img: 'Gintoki',
                    stock: 1,
                    price: null
                })
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object').to.have.any.keys('msg', 'errors')
                    expect(res.body.msg).to.equal('Validation Error')
                    expect(res.body.errors).to.be.an('array').that.includes('Price is required')
                    done()
                })
            });
        })
    })

    describe('GET /products', function() {
        describe('SuccessProcess', function() {
            it('Should send a products array of object with 200 status code', function(done) {
                chai.request(app)
                .get('/products')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body[0]).to.have.property('_id');
                    expect(res.body[0]).to.have.property('name');
                    expect(res.body[0]).to.have.property('description');
                    expect(res.body[0]).to.have.property('img');
                    expect(res.body[0]).to.have.property('stock');
                    expect(res.body[0]).to.have.property('price');
                })
            })
        })
    })
})