const bcrypt = require('bcryptjs');

module.exports = {
    generate: function(password) {
        console.log(password, "ini pasworrrd")
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    },
    compare: function(password, passwordDB){
        return bcrypt.compareSync(password, passwordDB);
    }
}