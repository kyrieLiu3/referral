const { connectDb, operateDb } = require('../../database/tool')

class Position {
  addPosition = async ({
    positionName,
    positionType,
    city,
    positionDescribtion,
    positionResposibilites,
    positionQualifications,
    positionId,
    candidateIds = [],
  }) => {
    const db = await connectDb()
    const SQL = `
      INSERT INTO positions(positionName, positionType, city, positionDescribtion, positionResposibilites, positionQualifications, positionId, candidateIds) VALUES(?, ?, ?, ?, ?, ?, ?, ?) 
    `
    const params = [
      positionName,
      positionType,
      city,
      positionDescribtion,
      positionResposibilites,
      positionQualifications,
      positionId,
      JSON.stringify(candidateIds),
    ]
    return await operateDb(db, SQL, params)
  }
}

export default new Position()
