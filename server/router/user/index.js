const { signupHandler } = require('../../service/index')

module.exports = [
  {
    method: 'post',
    path: '/user/signup',
    handler: signupHandler
  },
]
