import mongodb from 'mongodb'
import { getDb } from "../utils/database.js";

class IndustryType {
  constructor({name, description, dataByCountry = { "Mali": 0 }, total=0, id}) {
    if (id) {
      this.id = id;
    }
    this.name = name;
    this.description = description;
    this.dataByCountry = dataByCountry;
  }

  static fetchAll() {
    const db = getDb()
    return db.collection('industry_types').find().toArray()
  }

  static fetchById(id) {
    const db = getDb()
    if (typeof id != "string") throw new Error("feach by id : country id should be a string")
    return db.collection('industry_types').findOne({
      _id: new mongodb.ObjectId(id)
    })
  }

  static deleteById(id) {
    const db = getDb()
    if (typeof id != "string") throw new Error("delete by id : country id should be a string")
    return db.collection('industry_types').deleteOne({
      _id: new mongodb.ObjectId(id)
    })
  }

  save() {
    const db = getDb()
    if (this.id && typeof this.id == "string") {
      return db.collection('industry_types').updateOne({_id: new mongodb.ObjectId(this.id)}, {$set: this})
    }
    return db.collection('industry_types').insertOne(this)
  }
}

export default IndustryType