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

    static search(body) {
      console.log(body)
      const { industryTypes, countries, keywords, marketTypes } = body
      const db = getDb()
      let query = {}
      if (industryTypes && Array.isArray(industryTypes)
        && industryTypes.length > 0) {
        query.industryType = {
          $in: industryTypes
        }
      }
      if (countries && Array.isArray(countries)
        && countries.length > 0) {
        query.country = {
          $in: countries
        }
      }
      if (keywords && Array.isArray(keywords)
        && keywords.length > 0) {
        query.$or = keywords.flatMap(keyword => {
          return [
            {
              title: {
                $regex: keyword,
                $options: 'i'
              }
            },
            {
              description: {
                $regex: keyword,
                $options: 'i'
              }
            },
            {
              tags: {
                $elemMatch: {
                  $regex: keyword,
                  $options: 'i'
                }
              }
            }
          ]
        })
      }
      // convert today to a string

      if (marketTypes
        && typeof marketTypes.expired == "boolean"
        && marketTypes.expired == true
        && marketTypes.ongoing == false) {
          console.log("try to show expired")
          //show tender with expired date greater than today
          query["dates.expire"] = { $lt:  (new Date).toISOString()}
      }
      
      if (marketTypes
        && typeof marketTypes.ongoing == "boolean"
        && marketTypes.expired == false
        && marketTypes.ongoing == true) {
          console.log("try to show ongoing")
          //show tender with expired date greater than today
          query["dates.expire"] = { $gt: (new Date).toISOString() }
      }

      console.log("query", query)
      return db.collection('tenders').find(query).toArray().then(tenders => {
        return tenders
      }).catch(err => {
        console.log(err)
      })
      
    }
}

export default Tender