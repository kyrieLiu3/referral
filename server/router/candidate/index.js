const { uploadResumeHandler } = require('../../service/index')

module.exports = [
  {
    method: 'post',
    path: '/candidate/uploadResume',
    handler: uploadResumeHandler,
  }
]
