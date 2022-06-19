const { connectDb, operateDb } = require('../../database/tool')
const { EMPLOYEE } = require('../../database/constant') 

class Users {
  // user signup
  signup = async (username, password, role = EMPLOYEE) => {
    const db = await connectDb()
    const SQL = `
      INSERT INTO users(username, password, role) VALUES(?, ?, ?) 
    `
    const params = [username, password, role]
    return await operateDb(db, SQL, params)
  }

  validateEmail = async (email) => {
    const db = await connectDb()
    const SQL = `
      SELECT username FROM users WHERE username=?
    `
    const params = [email]
    return await operateDb(db, SQL, params)
  }
}

module.exports = new Users()