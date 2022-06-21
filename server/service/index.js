const {
  signupHandler,
  validateEmailHandler,
  signinHandler,
  getUserDataHandler,
  changePasswordHandler
} = require('./user')

exports.signupHandler = signupHandler
exports.validateEmailHandler = validateEmailHandler
exports.signinHandler = signinHandler
exports.getUserDataHandler = getUserDataHandler
exports.changePasswordHandler = changePasswordHandler
