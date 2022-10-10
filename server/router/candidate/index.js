const {
  addCandidateHandler,
  getCandidatesByUserIdHandler,
  getCandidatebyIdHandler,
  updateCandidateByIdHandler,
  getCandidatesByPositionIdHandler,
  getCandidatesByHrgUserIdHandler,
  updateCandidateStatusHandler,
} = require('../../service/index')

module.exports = [
  {
    method: 'post',
    path: '/candidate/addCandidate',
    handler: addCandidateHandler,
  },
  {
    method: 'get',
    path: '/candidate/getCandidatesByUserId',
    handler: getCandidatesByUserIdHandler,
  },
  {
    method: 'get',
    path: '/candidate/getCandidateById',
    handler: getCandidatebyIdHandler,
  },
  {
    method: 'post',
    path: '/candidate/updateCandidateById',
    handler: updateCandidateByIdHandler,
  },
  {
    method: 'get',
    path: '/candidate/getCandidatesByPositionId',
    handler: getCandidatesByPositionIdHandler,
  },
  {
    method: 'get',
    path: '/candidate/getCandidatesByHrgUserId',
    handler: getCandidatesByHrgUserIdHandler,
  },
  {
    method: 'post',
    path: '/candidate/updateCandidateStatus',
    handler: updateCandidateStatusHandler,
  },
]
