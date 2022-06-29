const path = require('path')
const fs = require('fs')
const { successStructure, /* failStructure */ } = require('../utils')

exports.uploadResumeHandler = async (ctx, next) => {
  try {
    const { files } = ctx.request.files
    const reader = fs.createReadStream(files.path)
    const uploadPath = path.join("../../database/uploads", files.newFilename)
    const upStream = fs.createWriteStream(uploadPath)
    reader.pipe(upStream)
    ctx.body = { ...successStructure, data: true }
  } catch (error) {
    console.log(error)
    ctx.status = 500
  }
}
