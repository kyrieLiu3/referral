const { v4: uuid } = require('uuid')
const Position = require('../../controller/positions')
const { successStructure, /* failStructure */ } = require('../utils')
const { ALL, DEFAULT_PAGE_SIZE } = require('../../database/constant')

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
    if (userId) {
      const positions = await Position.getPositionsByUserId(userId)
      ctx.body = { ...successStructure, data: positions }
    } else {
      ctx.status = 400
    }
  } catch (error) {
    console.log(error)
    ctx.status = 500
  }
}

exports.getPositionhandler = async ctx => {
  try {
    const { positionId } = ctx.request.query
    console.log(positionId, 'positionId')
    if (positionId) {
      const [position] = await Position.getPositionById(positionId)
      ctx.body = { ...successStructure, data: position }
    } else {
      ctx.status = 400
    }
  } catch (error) {
    console.log(error)
    ctx.status = 500
  }
}

exports.updatePositionHandler = async ctx => {
  try {
    const params = { ...ctx.request.body }
    if (validateUploadPosition) {
      await Position.updatePositionById(params)
      ctx.body = { ...successStructure, data: true }
    } else {
      ctx.status = 400
    }
  } catch (error) {
    console.log(error)
    ctx.status = 500
  }
}

exports.getPositionsByConditionsHandler = async ctx => {
  try {
    const { positionType, city, positionName = '', pageNumber = 1, pageSize = DEFAULT_PAGE_SIZE } = { ...ctx.request.query }
    const params = { positionType, city, positionName }
    if (positionType === ALL) Reflect.deleteProperty(params, 'positionType')
    if (city === ALL) Reflect.deleteProperty(params, 'city')
    const results = await Position.getPositionsByConditions(params)
    console.log(results, 'results')
    const total = results.length
    const positions = results.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
    ctx.body = { ...successStructure, data: { positions, pageNumber, pageSize, total }}
  } catch (error) {
    console.log(error)
    ctx.status = 500
  }
}
