const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);

function googleVerify(req,res,next){
    client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID
    })
    .then(ticket => {
        const payload = ticket.getPayload();
        req.decoded = payload
        next()
    })
    .catch(err => {
        next({
            code : 403,
            message: 'Google Verify Failed'
        })
    })
}

module.exports = googleVerify