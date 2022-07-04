const path = require('path')
const fs = require('fs')
const { v4: uuid } = require('uuid')
const send = require('koa-send')
const Resume = require('../../controller/resumes')
const Candidate = require('../../controller/candidates')
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
      resumeId: uuid(),
    }
    await Resume.addResume(resumeInfo)
    ctx.body = { ...successStructure, data: resumeInfo }
  } catch (error) {
    console.log(error)
    ctx.status = 500
  }
}

exports.downResumeHandler = async ctx => {
  try {
    const { candidateId } = ctx.request.body
    if (candidateId) {
      const { resumeId } = await Candidate.getCandidateById(candidateId)
      const { resumeName, resumeOriginalName } = await Resume.getResumeById(
        resumeId
      )
      const resumeUploadPath = path.join(
        __dirname,
        '../../database/uploads'
      )
      ctx.attachment(encodeURIComponent(resumeOriginalName))
      ctx.set('Access-Control-Expose-Headers', 'Content-Disposition')
      await send(ctx, resumeName, { root: resumeUploadPath })
    } else {
      ctx.status = 400
    }
  } catch (error) {
    console.log(error)
    ctx.status = 500
  }
}
