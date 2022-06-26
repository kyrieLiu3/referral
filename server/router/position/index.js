const {
  uploadPositionHandler,
  getUploadedPositionHandler,
  getPositionhandler,
  updatePositionHandler,
} = require('../../service/index')

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
  {
    method: 'get',
    path: '/position/getPosition',
    handler: getPositionhandler,
  },
  {
    method: 'post',
    path: '/position/updatePosition',
    handler: updatePositionHandler,
  },
]
