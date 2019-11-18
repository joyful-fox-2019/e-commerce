const User = require('../models/user');

module.exports = function(done) {
  if (process.env.NODE_ENV === 'test') {
    User
      .deleteMany({
          _id:{
              $nin: ["5cb4c91945915a17560764bc", "5cb4c91945915a17560764bd" ]
          }
      })
      .then(function() {
        done();
      })
      .catch(function(err) {
        console.log(err);
        done(err)
      });
  }
};