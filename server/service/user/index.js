const { v4: uuid } = require('uuid')
const User = require('../../controller/users')
const {
  successStructure,
  failStructure,
  mailReg,
  passwordReg,
} = require('../utils')
const { EMPLOYEE, HRG, INVITATION_CODE } = require('../../database/constant')
const { generateToken } = require('../../jwt')

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
        ctx.status = 400
        return false
      }
      const userId = uuid()
      const results = await User.signup(username, password, role, userId)
      ctx.body = { ...successStructure, data: results }
    } else {
      ctx.status = 400
    }
  } catch (error) {
    console.log(error)
    ctx.status = 500
  }
}

exports.validateEmailHandler = async ctx => {
  try {
    const { email } = ctx.request.query
    if (!validateValidataEmail(email)) {
      // fail
      ctx.status = 400
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
    ctx.status = 500
  }
}

exports.signinHandler = async ctx => {
  try {
    const { username, password, role } = ctx.request.body
    if (validataSignin(username, password, role)) {
      // success
      const results = await User.signin(username, password, role)
      if (results.length) {
        const [user] = results
        const timestamp = +new Date()
        const token = await generateToken({ userId: user.userId, timestamp })
        ctx.body = { ...successStructure, data: { username, userId: user.userId, role, token } }
      } else {
        ctx.body = {
          ...failStructure,
          data: 'Username or password is incorrect',
        }
      }
    } else {
      ctx.status = 400
    }
  } catch (error) {
    console.log(error)
    ctx.status = 500
  }
}

exports.getUserDataHandler = async ctx => {
  try {
    const { userId, username, role } = ctx.state.user
    ctx.body = { ...successStructure, data: { userId, username, role } }
  } catch (error) {
    ctx.status = 500
  }
}
