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