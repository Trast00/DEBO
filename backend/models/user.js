import { getDb } from "../utils/database.js"

class User {
  constructor({uuid, name, email, role, isPremuim, premuimEndDate, preference}) {
    this.uuid = uuid
    this.name = name
    this.email = email
    this.role = role
    this.isPremuim = isPremuim
    this.premuimEndDate = premuimEndDate
    this.preference = preference
  }

  save = () => {
    const user = this
    const db = getDb()
    return db.collection('users').insertOne(user)
  }

  update = () => {
    const user = this
    const db = getDb()
    return db.collection('users').updateOne({uuid: user.uuid}, {$set: user})
  }

  static getByUuid = (uuid) => {
    if (!uuid || typeof uuid != "string") throw "Auth get user by id: id string is required"
    const db = getDb()
    return db.collection('users').findOne({uuid: uuid})
  }

  static getPremuimStatuByEmail = (email) => {
    if (!email || typeof email != "string") throw "Auth get premuim user by email: email string is required"
    const db = getDb()
    return db.collection('premium_emails').findOne({email})
  }
}

export default User