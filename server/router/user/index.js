const {
  signupHandler,
  validateEmailHandler,
  signinHandler,
} = require('../../service/index')

module.exports = [
  {
    method: 'post',
    path: '/user/signup',
    handler: signupHandler,
  },
  {
    method: 'get',
    path: '/user/validateEmail',
    handler: validateEmailHandler,
  },
  {
    method: 'post',
    path: '/user/signin',
    handler: signinHandler,
  },
]
