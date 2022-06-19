const User = require('../../controller/users')
const { successStructure, mailReg, passwordReg } = require('../utils')
const { PARAMS_ERROR, SERVER_ERROR } = require('../../constant')
const { EMPLOYEE, HRG, INVITATION_CODE } = require('../../database/constant')

const validateSignup = (username, password, role, invitationCode) => {
  return !(
    !mailReg.test(username) ||
    !passwordReg.test(password) ||
    (role !== EMPLOYEE && role !== HRG) ||
    (role === HRG && invitationCode !== INVITATION_CODE)
  )
}

const validateValidataEmail = email => {
  return mailReg.test(email)
}

exports.signupHandler = async ctx => {
  try {
    const { username, password, role, invitationCode } = ctx.request.body
    if (validateSignup(username, password, role, invitationCode)) {
      const results = await User.signup(username, password, role)
      ctx.body = { ...successStructure, data: results }
    } else {
      // FIXME: handle uniform error
      ctx.throw(400, PARAMS_ERROR)
    }
  } catch (error) {
    ctx.throw(500, SERVER_ERROR)
  }
}

exports.validateEmailHandler = async ctx => {
  try {
    const { email } = ctx.request.query
    if (!validateValidataEmail(email)) {
      // FIXME: handle uniform error
      ctx.throw(400, PARAMS_ERROR)
      return false
    }
    const results = await User.validateEmail(email)
    if (results.length) {
      ctx.body = { ...successStructure, data: false }
    } else {
      ctx.body = { ...successStructure, data: true }
    }
  } catch (error) {
    ctx.throw(500, SERVER_ERROR)
  }
}
