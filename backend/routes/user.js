import express from 'express'
import { getPremuimEmails, getUser, listPremuimUsers, postPremuimEmail, postUser } from '../controllers/usersController.js';
import { dbLoaded } from '../utils/database.js';
console.log("Start User Routing")
const router = express.Router();

if(dbLoaded && listPremuimUsers.length === 0) {
  console.log("FECTHING PREMUIMS")

}

router.get('/users/premuims', getPremuimEmails);
router.post('/users/premuims', postPremuimEmail);

router.get('/users/:uuid', getUser);
router.post('/users', postUser);

export default router