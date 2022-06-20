const User = require('../../controller/users')
const {
  successStructure,
  failStructure,
  mailReg,
  passwordReg,
  setErrorResponse,
} = require('../utils')
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

const validataSignin = (username, password, role) => {
  return !(
    !mailReg.test(username) ||
    !passwordReg.test(password) ||
    (role !== EMPLOYEE && role !== HRG)
  )
}

exports.signupHandler = async ctx => {
  try {
    const { username, password, role, invitationCode } = ctx.request.body
    if (validateSignup(username, password, role, invitationCode)) {
      // success
      const validateEmailRes = await User.validateEmail(username)
      if (validateEmailRes.length) {
        setErrorResponse(ctx, 400)
        return false
      }
      const results = await User.signup(username, password, role)
      ctx.body = { ...successStructure, data: results }
    } else {
      setErrorResponse(ctx, 400)
    }
  } catch (error) {
    console.log(error)
    setErrorResponse(ctx, 500)
  }
}

exports.validateEmailHandler = async ctx => {
  try {
    const { email } = ctx.request.query
    if (!validateValidataEmail(email)) {
      // fail
      setErrorResponse(ctx, 400)
      return false
    }
    const results = await User.validateEmail(email)
    if (results.length) {
      ctx.body = { ...successStructure, data: false }
    } else {
      ctx.body = { ...successStructure, data: true }
    }
  } catch (error) {
    console.log(error)
    setErrorResponse(ctx, 500)
  }
}

exports.signinHandler = async ctx => {
  try {
    const { username, password, role } = ctx.request.body
    if (validataSignin(username, password, role)) {
      // success
      const results = await User.signin(username, password, role)
      if (results.length) {
        ctx.body = { ...successStructure }
      } else {
        ctx.body = {
          ...failStructure,
          data: 'Username or password is incorrect',
        }
      }
    } else {
      setErrorResponse(ctx, 400)
    }
  } catch (error) {
    console.log(error)
    setErrorResponse(ctx, 500)
  }
}
