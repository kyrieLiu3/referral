const { uploadPositionHandler } = require('../../service/index')
const { getUploadedPositionHandler } = require('../../service/index')

module.exports = [
  {
    method: 'post',
    path: '/position/uploadPosition',
    handler: uploadPositionHandler,
  },
  {
    method: 'get',
    path: '/position/uploadedPositions',
    handler: getUploadedPositionHandler,
  },
]
