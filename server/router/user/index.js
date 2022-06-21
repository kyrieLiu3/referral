const {
  signupHandler,
  validateEmailHandler,
  signinHandler,
  getUserDataHandler,
  changePasswordHandler
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
  },
  {
    method: 'post',
    path: '/user/changePassword',
    handler: changePasswordHandler
  }
]
