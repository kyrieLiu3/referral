const {
  signupHandler,
  validateEmailHandler,
  signinHandler,
  getUserDataHandler,
  changePasswordHandler,
} = require('./user')

const {
  uploadPositionHandler,
  getUploadedPositionHandler,
  getPositionhandler,
  updatePositionHandler,
  getPositionsByConditionsHandler
} = require('./position')

// user
exports.signupHandler = signupHandler
exports.validateEmailHandler = validateEmailHandler
exports.signinHandler = signinHandler
exports.getUserDataHandler = getUserDataHandler
exports.changePasswordHandler = changePasswordHandler

// position
exports.uploadPositionHandler = uploadPositionHandler
exports.getUploadedPositionHandler = getUploadedPositionHandler
exports.getPositionhandler = getPositionhandler
exports.updatePositionHandler = updatePositionHandler
exports.getPositionsByConditionsHandler = getPositionsByConditionsHandler
