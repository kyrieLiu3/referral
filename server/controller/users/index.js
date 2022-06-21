const { connectDb, operateDb } = require('../../database/tool')
const { EMPLOYEE } = require('../../database/constant')

class Users {
  // user signup
  signup = async (username, password, role = EMPLOYEE, userId) => {
    const db = await connectDb()
    const SQL = `
      INSERT INTO users(username, password, role, userId) VALUES(?, ?, ?, ?) 
    `
    const params = [username, password, role, userId]
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

  signin = async (username, password, role) => {
    const db = await connectDb()
    const SQL = `
      SELECT * FROM users WHERE username=? AND password=? AND role=?
    `
    const params = [username, password, role]
    return await operateDb(db, SQL, params)
  }

  userData = async (userId) => {
    const db = await connectDb()
    const SQL = `
      SELECT * FROM users WHERE userId=?
    `
    const params = [userId]
    return await operateDb(db, SQL, params)
  }
}

module.exports = new Users()