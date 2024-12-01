import { getDb } from "../utils/database"

class AnalyticalData {
  constructor({id, source, eventType, eventDescription, user: {userId, userName}, data: {dataId, dataName}}, other) {
    this.id = id
    this.source = source
    this.eventType = eventType
    this.eventDescription = eventDescription
    this.user = {userId, userName}
    this.data = {dataId, dataName}
    this.other = other
  }

  save() {
    const db = getDb()
    return db.collection('analytical_data').insertOne(this).then(result => {
      return result
    }).catch(err => {
      res.status(500).send(err)
    })
  }

  static getAll() {
    const db = getDb()
    return db.collection('analytical_data').find().toArray()
  }

}

export default AnalyticalData