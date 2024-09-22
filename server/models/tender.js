import { getDb } from "../utils/database.js"
import mongodb from "mongodb"

class Tender {
    constructor({title, description, country, industryType, dates, buyer, pdfUrl, tags, budget, companyType, uuid}) {
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
      this.companyType = companyType
      if (budget && typeof budget === 'object' && budget.value && budget.currency) {
        this.budget = budget
      } else {
        this.budget = {
          value: -1,
          currency: ""
        }
      }

    }

    save(id) {
      // save to database
      const db = getDb()
      // if id is provided, update the tender
      if (id && typeof id == "string") {
        return db.collection('tenders').updateOne({_id: new mongodb.ObjectId(id)}, {$set: this}).then().catch(err => { 
          res.status(500).send(err)
        })
      }
      // if id is not provided, create a new tender
      return db.collection('tenders').insertOne(this).then(result => {
        return result
      }).catch(err => { 
        res.status(500).send(err)
      })
    }

    static fetchAll() {
        const db = getDb()
        return db.collection('tenders').find().toArray().then(tenders => {
            return tenders
        }).catch(err => {
            res.status(500).send(err)
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
        res.status(500).send(err)
      })
    }

    static deleteById(id) {
      const db = getDb()
      if (typeof id != "string") throw new Error("delete by id : tender id should be a string")
      return db.collection('tenders').deleteOne({
        _id: new mongodb.ObjectId(id)
      }).then().catch(err => {
        res.status(500).send(err)
      })
    }

    static getTendersByIds(ids) {
      const db = getDb()
      if (!Array.isArray(ids)) throw new Error("getTendersByIds : ids should be an array")
      // check if all ids are string
      
      return db.collection('tenders').find({
        _id: {
          $in: ids.map(id => {
            if (typeof id !== 'string') return
            return new mongodb.ObjectId(id)
          })
        }
      }).toArray().then(tenders => {
        return tenders
      }).catch(err => {
        res.status(500).send(err)
      })
    }

    static search(body) {
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
              country: {
                $regex: keyword,
                $options: 'i'
              }
            },
            {
              industryType: {
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
          //show tender with expired date greater than today
          query["dates.expire"] = { $lt:  (new Date).toISOString()}
      }
      
      if (marketTypes
        && typeof marketTypes.ongoing == "boolean"
        && marketTypes.expired == false
        && marketTypes.ongoing == true) {
          //show tender with expired date greater than today
          query["dates.expire"] = { $gt: (new Date).toISOString() }
      }

      if (marketTypes
        && typeof marketTypes.company == "boolean"
        && marketTypes.company == true
        && marketTypes.office == false) {
          query["companyType"] = "company"
      }
      if (marketTypes
        && typeof marketTypes.office == "boolean"
        && marketTypes.office == true
        && marketTypes.company == false) {
          query["companyType"] = "office"
      }

      //query order by recent creation date
      return db.collection('tenders').find(query).sort({ _id: -1 }).toArray().then(tenders => {
        return tenders
      }).catch(err => {
        res.status(500).send(err)
      })
      
    }
}

export default Tender