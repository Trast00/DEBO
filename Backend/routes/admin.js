import express from 'express';
import { getModeratorByCredentials } from '../controllers/adminController.js';
// import .env require
import dotenv from 'dotenv';
import { render } from 'ejs';
import { fetchAllIndustryTypes } from '../controllers/industryTypesController.js';
dotenv.config();

const router = express.Router();
const devurl = process.env.DEV_URL;


//dashboard
router.get(`${devurl}/dashboard`, (req, res, next) => {
  // get all the industry types
  if (!req.session.moderator?.email) res.redirect(devurl)
  console.log("Try to render dev-auth", req.session.moderator?.email)
  fetchAllIndustryTypes().then(industryTypes => {
    const { email, password, credential } = req.body;
    res.render('dashboard.ejs', { devurl: devurl, email: email, password: password, credential: credential, listIndustries: industryTypes});
  })
});
//login page
console.log("devURL is: ", devurl)
router.get(devurl, (req, res, next) => {
  console.log("Try to render dev-auth", req.session.moderator)
  //I don't want the code to continue after this render
  if (req.session.moderator) {
    console.log("Try to render dev-auth", req.session.moderator?.email)
    const email = req.session.moderator?.email ? req.session.moderator.email : '';
    res.render('dev-auth.ejs', { devurl: devurl, email: email})
    return;
  } else {
    next();
  }
});
//logged in
router.post(devurl, (req, res, next) => {
  console.log("Try to render dev-auth 1", req.session.moderator?.email)
  //get all moderator and developer
  getModeratorByCredentials(req, res, next).then(moderator => {
    if (moderator && (moderator.role === 'moderator' || moderator.role === 'developer')) {
      // req.session.moderator = moderator;
      req.session.moderator = moderator;
      //Cannot set properties of undefined (setting 'moderator')
      res.redirect(302, `${devurl}/dashboard`);
      return;
    } else {
      return res.status(401).send('Unauthorized');
    }
  })
});

router.use(devurl, (req, res, __) => {
  console.log("Try to render dev-auth 2", req.session.moderator?.email)
  res.render('dev-auth.ejs', { devurl: devurl, email: ''})
  //next();
});



export default router