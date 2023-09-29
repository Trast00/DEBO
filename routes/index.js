import express from 'express'
const router = express.Router()

router.get('/', (req, res, next)=>{
  res.render('index.ejs', {
    pageTitle: "Home"
  })
})

router.get('/information', (req, res, next)=>{
  res.render('information.ejs', {
    pageTitle: "About"
  })
})

router.get('/payement', (req, res, next)=>{
  res.render('payement.ejs', {
    pageTitle: "payement"
  })
})

export default router