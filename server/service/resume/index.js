const path = require('path')
const fs = require('fs')
const { v4: uuid } = require('uuid')
const Resume = require('../../controller/resumes')
const { successStructure /* failStructure */ } = require('../utils')

exports.uploadResumeHandler = async ctx => {
  try {
    const { files } = ctx.request.files
    const reader = fs.createReadStream(files.filepath)
    const uploadPath = path.join(
      __dirname,
      '../../database/uploads',
      files.newFilename
    )
    const upStream = fs.createWriteStream(uploadPath)
    reader.pipe(upStream)
    const resumeInfo = {
      resumeName: files.newFilename,
      resumeOriginalName: files.originalFilename,
      resumeId: uuid()
    }
    await Resume.addResume(resumeInfo)
    ctx.body = { ...successStructure, data: resumeInfo }
  } catch (error) {
    console.log(error)
    ctx.status = 500
  }
}
