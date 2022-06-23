const { connectDb } = require('./tool')

// init users table
const createUserTable = db => {
  const SQL = `
    CREATE TABLE IF NOT EXISTS users 
    (id INTEGER PRIMARY KEY, username Text, password TEXT, role TEXT, userId TEXT)
  `
  db.run(SQL, () => console.log('[Database] Create users table'))
}

// init positions table
const createPositionsTable = db => {
  const SQL = `
  CREATE TABLE IF NOT EXISTS positions
  (id INTEGER PRIMARY KEY, positionName Text, positionType TEXT, city TEXT, positionDescribtion TEXT, positionResposibilites TEXT, positionQualifications TEXT, positionId TEXT, candidateIds TEXT)
  `
  db.run(SQL, () => console.log('[Database] Create positions table'))
}

const initDatabase = async () => {
  try {
    const db = await connectDb()
    createUserTable(db)
    createPositionsTable(db)
  } catch (error) {
    console.log(error)
  }
}

module.exports = initDatabase
