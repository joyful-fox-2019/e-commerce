const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const Cart = require('../models/cart');

chai.use(chaiHttp);
const expect = chai.expect
let rps = 200
let qty = 2
let totalRps = rps * qty

before(function () {
    Cart.create({

    })
})