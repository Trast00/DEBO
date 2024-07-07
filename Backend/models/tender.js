import { getDb } from "../utils/database.js"
import mongodb from "mongodb"

class Tender {
    constructor({title, description, country, field, dates, buyer, pdfUrl, tags, budget, uuid}) {
      // solve the deprecated warning
      if (uuid && typeof uuid === 'string') {
        console.log("uuid is a string")
        this.uuid = new mongodb.ObjectId(uuid)
        console.log("CONVERTED")
      }
      this.title = title
      this.description = description
      this.country = country
      this.field = field
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
      if (id) {
        return db.collection('tenders').updateOne({uuid: id}, {$set: this}).then().catch(err => { 
          console.log(err)
        })
      }
      // if id is not provided, create a new tender
      return db.collection('tenders').insertOne(this).then(result => {
        console.log("Tender model created: ", result)
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
}

export default Tender