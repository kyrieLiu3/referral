const user = require('./user')
const position = require('./position')
const resume = require('./resume')

module.exports = [
  ...user,
  ...position,
  ...resume
]