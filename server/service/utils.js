const { SERVER_ERROR } = require('../constant')
exports.successStructure = {
  code: 0,
  status: 'success',
  data: {}
}

exports.failStructure = {
  code: 1,
  status: 'error',
  data: {}
}

exports.mailReg = /^\w+@(\w+.)\w{2,4}$/
exports.passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/

exports.handleUniformError = (ctx, error) => {
  const errorReg = /^\[ERROR\]\s\[(\d{3})\]\s\[(.*)\]/
  if (error.message && errorReg.test(error.message)) {
    const [group, statusCode, errorMessage] = error.message.match(errorReg)
    ctx.throw(Number(statusCode, errorMessage))
  } else {
    ctx.throw(500, SERVER_ERROR)
  }
}