class Country {
  constructor({name, code, id}) {
    this.id = country.id;
    this.name = country.name;
    this.code = country.code;
  }

  static fetchAll() {
    const db = getDb()
    return db.collection('countries').find().toArray()
  }

  static fetchById(id) {
    const db = getDb()
    if (typeof id != "string") throw new Error("feach by id : country id should be a string")
    return db.collection('countries').findOne({
      _id: new mongodb.ObjectId(id)
    })
  }

  static deleteById(id) {
    const db = getDb()
    if (typeof id != "string") throw new Error("delete by id : country id should be a string")
    return db.collection('countries').deleteOne({
      _id: new mongodb.ObjectId(id)
    })
  }

  save(id) {
    const db = getDb()
    if (id && typeof id == "string") {
      return db.collection('countries').updateOne({_id: new mongodb.ObjectId(id)}, {$set: this})
    }
    return db.collection('countries').insertOne(this)
  }
}