const { uploadResumeHandler, downResumeHandler } = require('../../service/index')

module.exports = [
  {
    method: 'post',
    path: '/resume/uploadResume',
    handler: uploadResumeHandler,
  },
  {
    method: 'post',
    path: '/resume/downloadResume',
    handler: downResumeHandler,
  }
]
