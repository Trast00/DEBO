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
  /*sconst tender = new Tender(
    req.body.uuid,
    req.body.title,
    req.body.description,
    req.body.country,
    req.body.field,
    req.body.dates,
    req.body.buyer,
    req.body.pdfUrl,
    req.body.tags,
    req.body.budget
  )*/
  // writte me a dummy tender
  // why I got a error here ?

  const tenderDummy = new Tender({
    title: "Dummy Tender",
    description: "This is a dummy tender",
    country: "Nigeria",
    field: "Agriculture",
    dates: {
      publish: "2022-07-06",
      expire: "2022-07-06"
    },
    buyer: {
      uuid: "auth0|667ac6a742af15aa920c997d",
      name: "dicko.tester",
      email: "dicko.tester@gmail.com"
    },
    pdfUrl: "https://www.google.com",
    tags: ["dummy", "tender"],
    budget: {
      value: 1000000,
      currency: "USD"
    }
})
  tenderDummy.save()
    .then(result => {
      console.log("tender created:",result)
      res.json(result)
    })
    .catch(err => console.log(err))
}

export const getTenders = (req, res, next) => {
  Tender.fetchAll()
    .then(tenders => {
      res.json(tenders)
    })
    .catch(err => console.log(err))
}