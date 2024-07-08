import express from 'express';
import { getModeratorByCredentials } from '../controllers/adminController.js';
// import .env require
import dotenv from 'dotenv';
import { render } from 'ejs';
dotenv.config();

const router = express.Router();
const devurl = process.env.DEV_URL;
//login page
router.get(devurl, (req, res, next) => {
  //I don't want the code to continue after this render
  console.log("Try to render dev-auth", req.session.moderator?.email)
  const email = req.session.moderator?.email ? req.session.moderator.email : '';
  res.render('dev-auth.ejs', { devurl: devurl, email: email})
  return;
});
//logged in
router.post(devurl, (req, res, next) => {
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

router.use((req, res, next) => {
  if (!req.session.moderator) {
    res.redirect(devurl);
    render('dev-auth.ejs', { devurl: devurl, email: ''})
    return;
  }
  next();
});


//dashboard
router.get(`${devurl}/dashboard`, (req, res, next) => {
  const { email, password, credential } = req.body;
  res.render('dashboard.ejs', { devurl: devurl, email: email, password: password, credential: credential});
});

export default router