const { uploadResumeHandler } = require('../../service/index')

module.exports = [
  {
    method: 'post',
    path: '/resume/uploadResume',
    handler: uploadResumeHandler,
  }
]
