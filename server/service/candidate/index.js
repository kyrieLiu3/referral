const { v4: uuid } = require('uuid')
const Candidate = require('../../controller/candidates')
const Position = require('../../controller/positions')
const { successStructure, /* failStructure */ } = require('../utils')

const validateCandidate = ({
  candidateName,
  candidatePhoneNumber,
  candidateEmail,
  candidateResume,
  resumeId,
  positionId
}) => {
  return !(
    !candidateName ||
    !candidatePhoneNumber ||
    !candidateEmail ||
    !candidateResume ||
    !resumeId ||
    !positionId
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
      await Position.updateCandidateIds({ candidateId, positionId: params.positionId })
      ctx.body = { ...successStructure, data: { candidateId } }
    } else {
      ctx.status = 400
    }
  } catch (error) {
    console.log(error)
    ctx.status = 500
  }
}