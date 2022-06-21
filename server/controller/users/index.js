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

  validateEmail = async email => {
    const db = await connectDb()
    const SQL = `
      SELECT username FROM users WHERE username=?
    `
    const params = [email]
    const [user] = await operateDb(db, SQL, params)
    return !!user
  }

  signin = async (username, password, role) => {
    const db = await connectDb()
    const SQL = `
      SELECT * FROM users WHERE username=? AND password=? AND role=?
    `
    const params = [username, password, role]
    const [user] = await operateDb(db, SQL, params)
    return user
  }

  userData = async userId => {
    const db = await connectDb()
    const SQL = `
      SELECT * FROM users WHERE userId=?
    `
    const params = [userId]
    return await operateDb(db, SQL, params)
  }

  validatePassword = async (userId, password) => {
    const db = await connectDb()
    const SQL = `
      SELECT * FROM users WHERE userId=? AND password=?
    `
    const params = [userId, password]
    const [user] = await operateDb(db, SQL, params)
    return !!user
  }

  changePassword = async (userId, newPassword) => {
    const db = await connectDb()
    const SQL = `
      UPDATE users SET password=? WHERE userId=?
    `
    const params = [newPassword, userId]
    return await operateDb(db, SQL, params)
  }
}

module.exports = new Users()
