const { v4: uuid } = require('uuid')
const Candidate = require('../../controller/candidates')
const Position = require('../../controller/positions')
const { successStructure /* failStructure */ } = require('../utils')

const validateCandidate = ({
  candidateName,
  candidatePhoneNumber,
  candidateEmail,
  candidateResume,
  resumeId,
  positionId,
  positionName,
}) => {
  return !(
    !candidateName ||
    !candidatePhoneNumber ||
    !candidateEmail ||
    !candidateResume ||
    !resumeId ||
    !positionId ||
    !positionName
  )
}

exports.addCandidateHandler = async ctx => {
  try {
    let params = { ...ctx.request.body }
    if (validateCandidate(params)) {
      const candidateId = uuid()
      const { userId } = ctx.state.user
      params = { ...params, candidateId, userId }
      await Candidate.addCandidate(params)
      await Position.updateCandidateIds({
        candidateId,
        positionId: params.positionId,
      })
      ctx.body = { ...successStructure, data: { candidateId } }
    } else {
      ctx.status = 400
    }
  } catch (error) {
    console.log(error)
    ctx.status = 500
  }
}

exports.getCandidatesByUserIdHandler = async ctx => {
  try {
    const { userId } = ctx.state.user
    const candidates = await Candidate.getCandidatesByUserId(userId)
    ctx.body = { ...successStructure, data: candidates }
  } catch (error) {
    console.log(error)
    ctx.status = 500
  }
}

exports.getCandidatebyIdHandler = async ctx => {
  try {
    const { candidateId } = ctx.request.query
    if (candidateId) {
      const candidate = await Candidate.getCandidateById(candidateId)
      ctx.body = { ...successStructure, data: candidate }
    } else {
      ctx.status = 400
    }
  } catch (error) {
    console.log(error)
    ctx.status = 500
  }
}

exports.updateCandidateByIdHandler = async ctx => {
  try {
    let params = { ...ctx.request.body }
    if (validateCandidate(params)) {
      await Candidate.updateCandidateById(params)
      ctx.body = {
        ...successStructure,
        data: { candidateId: params.candidateId },
      }
    } else {
      ctx.status = 400
    }
  } catch (error) {
    console.log(error)
    ctx.status = 500
  }
}

exports.getCandidatesByPositionIdHandler = async ctx => {
  try {
    const { positionId } = ctx.request.query
    if (positionId) {
      const candidates = await Candidate.getCandidatesByPositionId(positionId)
      ctx.body = { ...successStructure, data: candidates }
    } else {
      ctx.status = 400
    }
  } catch (error) {
    console.log(error)
    ctx.status = 500
  }
}

exports.getCandidatesByHrgUserIdHandler = async ctx => {
  try {
    const { userId } = ctx.request.query
    if (userId) {
      const candidateIds = await Position.getCandidateIdsByUserId(userId)
      const candidates = await Candidate.getCandidatesByCandidateIds(
        candidateIds
      )
      ctx.body = { ...successStructure, data: candidates }
    } else {
      ctx.status = 400
    }
  } catch (error) {
    console.log(error)
    ctx.status = 500
  }
}
