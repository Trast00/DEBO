import IndustryType from '../models/industryType.js'
import { getDb } from '../utils/database.js'

const fetchAllIndustryTypes = () => {
  const db = getDb()
  return db.collection('industry_types').find().toArray()
}

const getIndustryTypes = (req, res, next) => {
  const db = getDb()
  db.collection('industry_types').find().toArray()
    .then(industryTypes => {
      res.json(industryTypes)
    })
    .catch(err => {
      res.status(500).send(err)
    })
}

const getIndustryTypeByName = (req, res, next) => {
  const name = req.params.name
  const db = getDb()
  db.collection('industry_types').findOne({name: name}).then(industryType => {
    res.json(industryType)
  })
}

const postIndustryType = (req, res, next) => {
  console.log("Post Industry Type")
  const { name, description } = req.body
  const industryType = new IndustryType({ name: name, description: description })
  industryType.save()
    .then(result => {
      res.json(result)
    })
    .catch(err => {res.status(500).send(err)})
}

const deleteIndustryType = (req, res, next) => {
  const name = req.body.name
  const db = getDb()
  db.collection('industry_types').deleteOne({
    name: name
  }).then(result => {
    res.json(result)
  })
}

export { fetchAllIndustryTypes, getIndustryTypes, postIndustryType, getIndustryTypeByName, deleteIndustryType }

