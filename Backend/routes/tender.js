import express from 'express';
import { postTender, getTenders, getTenderById, updateTender, deleteTender, searchTender } from '../controllers/tendersController.js';

const router = express.Router();

router.get('/tenders', getTenders);
router.post('/tenders/search', searchTender);
router.post('/tenders', postTender);
router.get('/tenders/:id', getTenderById);
router.put('/tenders/:id', updateTender);
router.delete('/tenders/:id', deleteTender);


export default router