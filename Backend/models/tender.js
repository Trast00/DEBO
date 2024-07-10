import { getDb } from "../utils/database.js"
import mongodb from "mongodb"

class Tender {
    constructor({title, description, country, industryType, dates, buyer, pdfUrl, tags, budget, uuid}) {
      // solve the deprecated warning
      if (uuid && typeof uuid === 'string') {
        this._id = new mongodb.ObjectId(uuid)
      }
      this.title = title
      this.description = description
      this.country = country
      this.industryType = industryType
      this.dates = dates
      this.buyer = buyer
      this.pdfUrl = pdfUrl
      this.tags = tags
      this.budget = budget
    }

    save(id) {
      // save to database
      const db = getDb()
      // if id is provided, update the tender
      if (id && typeof id == "string") {
        return db.collection('tenders').updateOne({_id: new mongodb.ObjectId(id)}, {$set: this}).then().catch(err => { 
          console.log(err)
        })
      }
      // if id is not provided, create a new tender
      return db.collection('tenders').insertOne(this).then(result => {
        return result
      }).catch(err => { 
        console.log(err)
      })
    }

    static fetchAll() {
        const db = getDb()
        return db.collection('tenders').find().toArray().then(tenders => {
            return tenders
        }).catch(err => {
            console.log(err)
        })
    }

    static fetchById(id) {
      const db = getDb()
      if (typeof id != "string") throw new Error("feach by id : tender id should be a string")
      return db.collection('tenders').findOne({
        _id: new mongodb.ObjectId(id)
      }).then(tender => {
        return tender
      }
      ).catch(err => {
        console.log(err)
      })
    }

    static deleteById(id) {
      const db = getDb()
      if (typeof id != "string") throw new Error("delete by id : tender id should be a string")
      return db.collection('tenders').deleteOne({
        _id: new mongodb.ObjectId(id)
      }).then().catch(err => {
        console.log(err)
      })
    }
}

export default Tender