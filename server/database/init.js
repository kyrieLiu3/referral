const { connectDb } = require('./tool')

// init users table
const createUserTable = db => {
  const SQL = `
    CREATE TABLE IF NOT EXISTS users 
    (id INTEGER PRIMARY KEY, username Text, password TEXT, role TEXT, userId TEXT)
  `
  db.run(SQL, () => console.log('[Database] Create if users table NOT exists'))
}

// init positions table
const createPositionsTable = db => {
  const SQL = `
  CREATE TABLE IF NOT EXISTS positions
  (id INTEGER PRIMARY KEY, positionName Text, positionType TEXT, city TEXT, positionDescription TEXT, positionResponsibilities TEXT, positionQualifications TEXT, userId TEXT, positionId TEXT, candidateIds TEXT)
  `
  db.run(SQL, () => console.log('[Database] Create if positions table NOT exists'))
}

// init resumes table
const createResumesTable = db => {
  const SQL = `
  CREATE TABLE IF NOT EXISTS resumes
  (id INTEGER PRIMARY KEY, resumeName Text, resumeOriginalName TEXT, resumeId TEXT)
  `
  db.run(SQL, () => console.log('[Database] Create if resumes table NOT exsits'))
}

// init candidates table
const createCandidatesTable = db => {
  const SQL = `
  CREATE TABLE IF NOT EXISTS candidates
  (id INTEGER PRIMARY KEY, candidateName Text, candidatePhoneNumber TEXT, candidateEmail TEXT, candidateResume TEXT, candidateId TEXT, candidateStatus TEXT, candidateStatusTitle TEXT, resumeId TEXT, userId TEXT, positionId TEXT, positionName TEXT)
  `
  db.run(SQL, () => console.log('[Database] Create if candidates table NOT exsits'))
}

const initDatabase = async () => {
  try {
    const db = await connectDb()
    createUserTable(db)
    createPositionsTable(db)
    createResumesTable(db)
    createCandidatesTable(db)
  } catch (error) {
    console.log(error)
  }
}

module.exports = initDatabase
