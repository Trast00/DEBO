import Tender from '../models/tender.js'
import { listPremuimUsers } from './usersController.js'

export const postTender = (req, res, next) => {
  const tender = new Tender({
    title: req.body.title,
    description: req.body.description,
    country: req.body.country,
    industryType: req.body.industryType,
    dates: req.body.dates,
    buyer: req.body.buyer,
    pdfUrl: req.body.pdfUrl,
    tags: req.body.tags,
    budget: req.body.budget
  })
  
  tender.save()
    .then(result => {
      res.json(result)
    })
    .catch(err => {res.status(500).send(err)})
}

export const getTenders = (req, res, next) => {
  Tender.fetchAll()
    .then(tenders => {
      res.json(tenders)
    })
    .catch(err => {res.status(500).send(err)})
}

export const getTenderById = (req, res, next) => {
  Tender.fetchById(req.params.id)
    .then(tender => {
      res.json(tender)
    })
    .catch(err => {res.status(500).send(err)})
}

export const updateTender = (req, res, next) => {
  if (!req.params.id) {
    throw new Error("update tender: id is required")
  }
  const tender = new Tender({
    title: req.body.title,
    description: req.body.description,
    country: req.body.country,
    industryType: req.body.industryType,
    dates: req.body.dates,
    buyer: req.body.buyer,
    pdfUrl: req.body.pdfUrl,
    tags: req.body.tags,
    budget: req.body.budget,
    companyType: req.body.companyType
  })
  tender.save(req.params.id)
    .then(result => {
      res.json(result)
    })
    .catch(err => {res.status(500).send(err)})
}

export const deleteTender = (req, res, next) => {
  if (!req.params.id) {
    throw new Error("delete tender: id is required")
  }
  Tender.deleteById(req.params.id)
    .then(result => {
      res.json(result)
    })
    .catch(err => {res.status(500).send(err)})
}

export const searchTender = (req, res, next) => {
  console.log("Search Tender Controller")
  Tender.search(req.body)
    .then(tenders => {
      console.log(listPremuimUsers)
      const isPremuim = (listPremuimUsers.filter(user => user.email === req.body.email)).length > 0
      console.log("email:", req.body.email)

      if (isPremuim) {
        console.log("searchTender: user is premium")
        res.json(tenders)
      } else {
        console.log("searchTender: user is not premium")
        //tender without description, fileUrl, and buyer info for non authenticated user
        const guestTenders = tenders.map(tender => {
          return {
            _id: tender._id,
            title: "[offre cahée]",
            country: tender.country,
            industryType: tender.industryType,
            dates: tender.dates,
            tags: tender.tags,
            budget: tender.budget
          }
        })
        res.json(guestTenders)
      }
    })
    .catch(err => {res.status(500).send(err)})
}