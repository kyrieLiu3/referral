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
  getPositionsByConditionsHandler,
} = require('./position')

const { uploadResumeHandler, downResumeHandler } = require('./resume')

const {
  addCandidateHandler,
  getCandidatesByUserIdHandler,
  getCandidatebyIdHandler,
  updateCandidateByIdHandler,
} = require('./candidate')

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

// resume
exports.uploadResumeHandler = uploadResumeHandler
exports.downResumeHandler = downResumeHandler

// candidate
exports.addCandidateHandler = addCandidateHandler
exports.getCandidatesByUserIdHandler = getCandidatesByUserIdHandler
exports.getCandidatebyIdHandler = getCandidatebyIdHandler
exports.updateCandidateByIdHandler = updateCandidateByIdHandler
