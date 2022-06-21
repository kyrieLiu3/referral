const {
  signupHandler,
  validateEmailHandler,
  signinHandler,
  getUserDataHandler
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
  {
    method: 'get',
    path: '/user/getUserData',
    handler: getUserDataHandler
  }
]
