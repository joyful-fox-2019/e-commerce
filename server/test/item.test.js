const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const Item = require('../models/item');

chai.use(chaiHttp);
const expect = chai.expect

let newItem = {
    name: 'huricen thunder',
    stock: 30,
    category: 'newitem',
    rps: 500,
    image: 'newitem1.jpg'
}

before(function () {
    Item.create(newItem)
        .then(item => {
            console.log('success add new item')
        })
        .catch(err => {
            console.log(err)
        })
})

after(function (done) {
    // if (process.env.NODE_ENV === 'testing') {
    User.deleteMany({})
        .then(_ => {
            console.log('testing: delete data item success!');
            done()
        })
        .catch(err => {
            console.log(err);
        })
    // }
})

describe('Item routes', function () {
    describe('POST /items/', function () {
        describe('success process', function () {
            it('should send an object (message) with 201 status code', function (done) {
                chai.request(app)
                    .post('/items/')
                    .send(newItem)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(201)
                        done()
                    })
            })
        })
        describe('error process', function () {
            it('should send an object no image with 500 status code', function (done) {
                chai.request(app)
                    .post('/items/')
                    .send({
                        name: 'huricen thunder',
                        stock: 30,
                        category: 'newitem',
                        rps: 500,
                        image: ''
                    })
                    .end(function (err, res) {
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