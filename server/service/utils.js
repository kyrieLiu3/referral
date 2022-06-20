const { PARAMS_ERROR, SERVER_ERROR } = require('../constant')

const errorStatusCodeMap = {
  400: PARAMS_ERROR,
  500: SERVER_ERROR
}

exports.successStructure = {
  code: 0,
  status: 'success',
  data: {},
}

exports.failStructure = {
  code: 1,
  status: 'error',
  data: {},
}

exports.mailReg = /^\w+@(\w+.)\w{2,4}$/
exports.passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/

exports.setErrorResponse = (ctx, statusCode) => {
  ctx.status = statusCode
  ctx.message = errorStatusCodeMap[statusCode]
}
