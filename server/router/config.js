const user = require('./user')
const position = require('./position')
const resume = require('./resume')
const candidate = require('./candidate')

module.exports = [
  ...user,
  ...position,
  ...resume,
  ...candidate
]