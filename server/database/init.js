const { connectDb } = require('./tool')

// init users table
const createUserTable = db => {
  const SQL = `
    CREATE TABLE IF NOT EXISTS users 
    (id INTEGER PRIMARY KEY, username Text, password TEXT, role, INTEGER)
  `
  db.run(SQL, () => console.log('[Database] Create users table'))
}

const initDatabase = async () => {
  try {
    const db = await connectDb()
    createUserTable(db)
  } catch (error) {
    console.log(error)
  }
}

module.exports = initDatabase
