const user = require('./user')
const position = require('./position')
const candidate = require('./candidate')

module.exports = [
  ...user,
  ...position,
  ...candidate
]