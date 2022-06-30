const { connectDb, operateDb } = require('../../database/tool')


class Candidate {
  addCandidate = async ({
    candidateName,
    candidatePhoneNumber,
    candidateEmail,
    candidateResume,
    candidateId,
    resumeId,
    userId,
    positionId
  }) => {
    const db = await connectDb()
    const SQL = `
      INSERT INTO candidates(candidateName, candidatePhoneNumber, candidateEmail, candidateResume, candidateId, resumeId, userId, positionId) VALUES(?, ?, ?, ?, ?, ?, ?, ?) 
    `
    const params = [candidateName, candidatePhoneNumber, candidateEmail, JSON.stringify(candidateResume), candidateId, resumeId, userId, positionId]
    return await operateDb(db, SQL, params)
  }
}

module.exports = new Candidate()
