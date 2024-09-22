import express from 'express';
import { getModeratorByCredentials } from '../controllers/adminController.js';
import dotenv from 'dotenv';
import { fetchAllIndustryTypes } from '../controllers/industryTypesController.js';
import Country from '../models/country.js';
console.log("Start Admin Routing")
dotenv.config();

const router = express.Router();
const devurl = process.env.DEV_URL;


//dashboard
router.get(`/api${devurl}/dashboard`, (req, res, next) => {
  // get all the industry types
  if (!req.session.moderator?.email) {
    res.redirect(devurl)
    return;
  }
  fetchAllIndustryTypes().then(industryTypes => {
    Country.getAll().then(listCountries => {
      res.render('dashboard.ejs', { devurl: devurl, 
        email: "", 
        password: "", 
        credential: "", listIndustries: industryTypes, listCountries: listCountries});
    })
  })
});
//login page
router.get(`/api${devurl}`, (req, res, next) => {
  //I don't want the code to continue after this render
  if (req.session.moderator) {
    const email = req.session.moderator?.email ? req.session.moderator.email : '';
    res.render('dev-auth.ejs', { devurl: devurl, email: email})
    return;
  } else {
    next();
  }
});
//logged in
router.post(`/api${devurl}`, (req, res, next) => {
  getModeratorByCredentials(req, res, next).then(moderator => {
    if (moderator && (moderator.role === 'moderator' || moderator.role === 'developer')) {
      req.session.moderator = moderator;
      res.redirect(302, `/api${devurl}/dashboard`);
      return;
    } else {
      return res.status(401).send('Unauthorized');
    }
  })
});

router.use(`/api${devurl}`, (req, res, __) => {
  res.render('dev-auth.ejs', { devurl: devurl, email: ''})
});



export default router