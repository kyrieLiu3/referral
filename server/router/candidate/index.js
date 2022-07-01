const {
  addCandidateHandler,
  getCandidatesByUserIdHandler,
  getCandidatebyIdHandler,
  updateCandidateByIdHandler,
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
]
