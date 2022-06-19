const { signupHandler, validateEmailHandler } = require('../../service/index')

module.exports = [
  {
    method: 'post',
    path: '/user/signup',
    handler: signupHandler
  },
  {
    method: 'get',
    path: '/user/validateEmail',
    handler: validateEmailHandler
  }
]
