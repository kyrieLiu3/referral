const { connectDb, operateDb } = require('../../database/tool')
const { CANDIDATE_STATUS_MAPPING } = require('../../database/constant')

class Candidate {
  addCandidate = async ({
    candidateName,
    candidatePhoneNumber,
    candidateEmail,
    candidateResume,
    candidateId,
    resumeId,
    userId,
    positionId,
    positionName,
  }) => {
    const db = await connectDb()
    const SQL = `
      INSERT INTO candidates(candidateName, candidatePhoneNumber, candidateEmail, candidateResume, candidateId, candidateStatus, candidateStatusTitle, resumeId, userId, positionId, positionName) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) 
    `
    const params = [
      candidateName,
      candidatePhoneNumber,
      candidateEmail,
      JSON.stringify(candidateResume),
      candidateId,
      '0',
      CANDIDATE_STATUS_MAPPING['0'],
      resumeId,
      userId,
      positionId,
      positionName,
    ]
    return await operateDb(db, SQL, params)
  }

  getCandidatesByUserId = async userId => {
    const db = await connectDb()
    const SQL = `
      SELECT * FROM candidates WHERE userId=?
    `
    const params = [userId]
    return await operateDb(db, SQL, params)
  }

  getCandidateById = async candidateId => {
    const db = await connectDb()
    const SQL = `
      SELECT * FROM candidates WHERE candidateId=?
    `
    const params = [candidateId]
    let [candidate] = await operateDb(db, SQL, params)
    candidate = {
      ...candidate,
      candidateResume: [JSON.parse(candidate.candidateResume)],
    }
    return candidate
  }

  updateCandidateById = async ({
    candidateName,
    candidatePhoneNumber,
    candidateEmail,
    candidateResume,
    candidateId,
    resumeId,
    positionId,
    positionName,
  }) => {
    const db = await connectDb()
    const SQL = `
      UPDATE candidates SET candidateName=?, candidatePhoneNumber=?, candidateEmail=?, candidateResume=?, resumeId=?, positionId=?, positionName=? WHERE candidateId=?
    `
    const params = [
      candidateName,
      candidatePhoneNumber,
      candidateEmail,
      JSON.stringify(candidateResume),
      resumeId,
      positionId,
      positionName,
      candidateId,
    ]
    return await operateDb(db, SQL, params)
  }

  getCandidatesByPositionId = async positionId => {
    const db = await connectDb()
    const SQL = `
      SELECT * FROM candidates WHERE positionId=?
    `
    return await operateDb(db, SQL, [positionId])
  }

  // Internal invoking without SQL injection
  getCandidatesByCandidateIds = async (candidateIds = []) => {
    const db = await connectDb()
    const SQL = `
      SELECT * FROM candidates WHERE candidateId IN (${candidateIds
        .map(id => `'${id}'`)
        .toString()})
    `
    return await operateDb(db, SQL)
  }

  updateCandidateStatus = async (candidateId, candidateStatus) => {
    const db = await connectDb()
    const SQL = `
      UPDATE candidates SET candidateStatus=?, candidateStatusTitle=?  WHERE candidateId=?
    `
    const params = [
      candidateStatus,
      CANDIDATE_STATUS_MAPPING[candidateStatus],
      candidateId,
    ]
    return await operateDb(db, SQL, params)
  }
}

module.exports = new Candidate()
