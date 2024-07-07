import express from 'express';
import { postTender } from '../controllers/tendersController.js';

const router = express.Router();

router.get('/tenders/create', postTender);

export default router