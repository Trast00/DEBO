import express from 'express';
import { getModeratorByCredentials } from '../controllers/adminController.js';
// import .env require
import dotenv from 'dotenv';
import { fetchAllIndustryTypes } from '../controllers/industryTypesController.js';
dotenv.config();

const router = express.Router();
const devurl = process.env.DEV_URL;


//dashboard
router.get(`${devurl}/dashboard`, (req, res, next) => {
  // get all the industry types
  if (!req.session.moderator?.email) res.redirect(devurl)
  fetchAllIndustryTypes().then(industryTypes => {
    const { email, password, credential } = req.body;
    res.render('dashboard.ejs', { devurl: devurl, email: email, password: password, credential: credential, listIndustries: industryTypes});
  })
});
//login page
router.get(devurl, (req, res, next) => {
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
router.post(devurl, (req, res, next) => {
  getModeratorByCredentials(req, res, next).then(moderator => {
    if (moderator && (moderator.role === 'moderator' || moderator.role === 'developer')) {
      req.session.moderator = moderator;
      res.redirect(302, `${devurl}/dashboard`);
      return;
    } else {
      return res.status(401).send('Unauthorized');
    }
  })
});

router.use(devurl, (req, res, __) => {
  res.render('dev-auth.ejs', { devurl: devurl, email: ''})
});



export default router