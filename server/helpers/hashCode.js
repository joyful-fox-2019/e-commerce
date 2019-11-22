const bcryptjs = require('bcryptjs');
const salt = bcryptjs.genSaltSync(10);

module.exports = {
  hashCode (id) {
    return bcryptjs.hashSync(id, salt)
  },
  compareCode (id, code) {
    return bcryptjs.compareSync(id, code)
  }
}