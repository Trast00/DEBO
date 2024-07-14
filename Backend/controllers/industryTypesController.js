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
    .catch(err => console.log(err))
}

const getIndustryTypeByName = (req, res, next) => {
  const name = res.body.name
  const db = getDb()
  db.collection('industry_types').findOne({name: name}).then(industryType => {
    res.json(industryType)
  })
}

const postIndustryType = (req, res, next) => {
  const { name } = req.body
  const industryType = new IndustryType({ name: name })
  industryType.save()
    .then(result => {
      res.json(result)
    })
    .catch(err => console.log(err))
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

