import express from 'express'
import { getPremuimEmails, getUser, listPremuimUsers, postPremuimEmail, postUser } from '../controllers/usersController.js';
import { dbLoaded } from '../utils/database.js';
console.log("Start User Routing")
const router = express.Router();

if(dbLoaded && listPremuimUsers.length === 0) {
  console.log("FECTHING PREMUIMS")

}

router.get('/api/users/premuims', getPremuimEmails);
router.post('/api/users/premuims', postPremuimEmail);

router.get('/api/users/:uuid', getUser);
router.post('/api/users', postUser);

export default router