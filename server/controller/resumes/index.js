const { connectDb, operateDb } = require('../../database/tool')

class Resume {
  addResume = async ({ resumeName, resumeOriginalName, resumeId }) => {
    const db = await connectDb()
    const SQL = `
      INSERT INTO resumes(resumeName, resumeOriginalName, resumeId) VALUES(?, ?, ?) 
    `
    const params = [resumeName, resumeOriginalName, resumeId]
    return await operateDb(db, SQL, params)
  }

  getResumeById = async (resumeId) => {
    const db = await connectDb()
    const SQL = `
      SELECT * FROM resumes WHERE resumeId=?
    `
    const params = [resumeId]
    const [resume] = await operateDb(db, SQL, params)
    return resume
  }
}

module.exports = new Resume()