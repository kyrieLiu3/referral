const Sqlite3 = require('sqlite3')
const path = require('path')
const dbPath = path.join(__dirname, './database.sqlite3')

exports.connectDb = () => {
  return new Promise((resolve, reject) => {
    const db = new Sqlite3.Database(dbPath, error => {
      if (error) {
        console.log('[Database] could not connect to database: ' , error)
        reject(error)
      } else {
        console.log('[Database] connected to database successfully!')
        resolve(db)
      }
    })
  })
}

exports.operateDb = (db, SQL, params) => {
  return new Promise((resolve, reject) => {
    db.all(SQL, params, (error, results) => {
      if (error) reject(error)
      else {
        db.close()
        resolve(results)
      }
    })
  })
}