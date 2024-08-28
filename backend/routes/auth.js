import  express from 'express';
import { auth } from 'express-openid-connect'
import { getUserData } from '../controllers/usersController.js';
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

router.use('/', (req, res, next) => {
  // if user not authenticated, return 401
  if (!req.oidc || !req.oidc.isAuthenticated()) {
    res.status(401).send('Unauthorized')
  } else {
    getUserData(req, res, next).then(user => {
      req.user = user
      next()
    })
  }
})


export default router;