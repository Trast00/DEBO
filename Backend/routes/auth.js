import  express from 'express';
import { auth } from 'express-openid-connect'
import { getUserData } from '../controllers/authController.js';
import dotenv from 'dotenv';
/* To get access to enviroment variable */
dotenv.config();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASEURL,
  clientID: process.env.CLIENTID,
  issuerBaseURL: process.env.ISSUER,
};

const app = express();
const router = express.Router();

// auth router attaches /login, /logout, and /callback routes to the baseURL
router.use(auth(config));

// req.isAuthenticated is provided from the auth router
router.use('/', (req, res, next) => {
  // if user not authenticated, return 401
  console.log((req.oidc && req.oidc.isAuthenticated()) ? 'Logged in' : 'Logged out')
  if (!req.oidc && !req.oidc.isAuthenticated()) {
    res.status(401).send('Unauthorized')
  } 

  getUserData(req, res, next).then(user => {
    console.log("final user data", user)
    res.json(user)
  })

  //req.userId = req.oidc.user.sid
  /*
  console.log(req.oidc.user)
  {
    sid: 'pf_vuE7gTQAtjKOu9iltZiH2UIOGuZ8d',
    nickname: 'dicko.tester',
    name: 'dicko.tester@gmail.com',
    picture: 'https://s.gravatar.com/avatar/015f22e65286f76971f877b0004cde27?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fdi.png',
    updated_at: '2024-07-06T22:56:28.833Z',
    email: 'dicko.tester@gmail.com',
    email_verified: true,
    sub: 'auth0|667ac6a742af15aa920c997d'
  }
  */
  // res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
})


export default router;