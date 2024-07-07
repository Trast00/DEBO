/**
 * create me tender controller using this
 * Tender {
  uuid: string
  title: string
  description: string
  country: string
  field: string
  dates: {
    publish: string
    expire: string
  }
  buyer: {
    uuid: string
    name: string
    email: string
  }
  pdfUrl: string
  tags: Arrays<string>[]
  budget: {
    value: number
    currency: string
  }
}
 */
import Tender from '../models/tender.js'

export const postTender = (req, res, next) => {
  const tender = new Tender({
    title: req.body.title,
    description: req.body.description,
    country: req.body.country,
    field: req.body.field,
    dates: req.body.dates,
    buyer: req.body.buyer,
    pdfUrl: req.body.pdfUrl,
    tags: req.body.tags,
    budget: req.body.budget
  })
  
  tender.save()
    .then(result => {
      console.log("tender created:",result)
      res.json(result)
    })
    .catch(err => console.log(err))
}

export const getTenders = (req, res, next) => {
  Tender.fetchAll()
    .then(tenders => {
      console.log("Get tender:", tenders)
      res.json(tenders)
    })
    .catch(err => console.log(err))
}

export const getTenderById = (req, res, next) => {
  Tender.fetchById(req.params.id)
    .then(tender => {
      console.log("Get tender:", tender)
      res.json(tender)
    })
    .catch(err => console.log(err))
}

export const updateTender = (req, res, next) => {
  if (!req.params.id) {
    throw new Error("update tender: id is required")
  }
  const tender = new Tender({
    title: req.body.title,
    description: req.body.description,
    country: req.body.country,
    field: req.body.field,
    dates: req.body.dates,
    buyer: req.body.buyer,
    pdfUrl: req.body.pdfUrl,
    tags: req.body.tags,
    budget: req.body.budget,
  })
  tender.save(req.params.id)
    .then(result => {
      console.log("tender updated:",result)
      res.json(result)
    })
    .catch(err => console.log(err))
}

export const deleteTender = (req, res, next) => {
  if (!req.params.id) {
    throw new Error("delete tender: id is required")
  }
  Tender.deleteById(req.params.id)
    .then(result => {
      console.log("tender deleted:",result)
      res.json(result)
    })
    .catch(err => console.log(err))
}