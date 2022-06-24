const { connectDb, operateDb } = require('../../database/tool')

class Position {
  addPosition = async ({
    positionName,
    positionType,
    city,
    positionDescription,
    positionResponsibilities,
    positionQualifications,
    positionId,
    userId,
    candidateIds = [],
  }) => {
    const db = await connectDb()
    const SQL = `
      INSERT INTO positions(positionName, positionType, city, positionDescription, positionResponsibilities, positionQualifications, userId, positionId, candidateIds) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?) 
    `
    const params = [
      positionName,
      positionType,
      city,
      positionDescription,
      positionResponsibilities,
      positionQualifications,
      userId,
      positionId,
      JSON.stringify(candidateIds),
    ]
    return await operateDb(db, SQL, params)
  }

  getPositionsByUserId = async (userId) => {
    const db = await connectDb()
    const SQL = `
      SELECT * FROM positions WHERE userId=?
    `
    const params = [userId]
    return await operateDb(db, SQL, params)
  }
}

module.exports = new Position()
