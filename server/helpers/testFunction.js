const chai = require("chai");
const expect = chai.expect;


function errorTest (err,res, status, message){
    expect(err).to.be.null;
    expect(res).to.have.status(status);
    expect(res.body).to.be.an("object");
    expect(res.body).to.have.all.keys('error','message',"source","statusCode");
    expect(res.body.message).to.include(message); 
}
function successTest(err,res){
    expect(err).to.be.null;
    expect(res).to.have.status(200);
    expect(res.body).to.be.an("object");
}

module.exports = {
    errorTest,
    successTest
}