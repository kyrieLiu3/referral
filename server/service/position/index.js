const { v4: uuid } = require('uuid')
const Position = require('../../controller/positions')
const { successStructure, /* failStructure */ } = require('../utils')
// const { EMPLOYEE, HRG, INVITATION_CODE } = require('../../database/constant')

/* const validateSignup = (username, password, role, invitationCode) => {
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

const validateChangePassword = (password) => {
  return passwordReg.test(password)
} */
const validateUploadPosition = ({
  positionName,
  positionDescription,
  positionResponsibilities,
  positionQualifications,
  city,
  positionType,
}) => {
  return !(
    !positionName ||
    !positionDescription ||
    !positionResponsibilities ||
    !positionQualifications ||
    !city ||
    !positionType
  )
}

exports.uploadPositionHandler = async ctx => {
  try {
    let params = { ...ctx.request.body }
    if (validateUploadPosition(params)) {
      const positionId = uuid()
      const candidateIds = []
      const { userId } = ctx.state.user
      params = { ...params, positionId, candidateIds, userId }
      await Position.addPosition(params)
      ctx.body = { ...successStructure, data: { positionId } }
    } else {
      ctx.status = 400
    }
  } catch (error) {
    console.log(error)
    ctx.status = 500
  }
}

exports.getUploadedPositionHandler = async ctx => {
  try {
    const { userId } = ctx.state.user
    const positions = await Position.getPositionsByUserId(userId)
    ctx.body = { ...successStructure, data: positions }
  } catch (error) {
    console.log(error)
    ctx.status = 500
  }
}
