const { addCandidateHandler } = require('../../service/index')

module.exports = [
  {
    method: 'post',
    path: '/candidate/addCandidate',
    handler: addCandidateHandler,
  }
]
