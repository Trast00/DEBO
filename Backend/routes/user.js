import express from 'express'
import { getPremuimEmails, getUser, postPremuimEmail, postUser } from '../controllers/usersController.js';

const router = express.Router();

router.get('/users/premuims', getPremuimEmails);
router.post('/users/premuims', postPremuimEmail);

router.get('/users/:uuid', getUser);
router.post('/users', postUser);

export default router