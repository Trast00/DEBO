import express from 'express';
import { postTender, getTenders, getTenderById, updateTender, deleteTender, searchTender } from '../controllers/tendersController.js';
console.log("Start Tender Routing")
const router = express.Router();

router.get('/api/tenders', getTenders);
router.post('/api/tenders/search', searchTender);
router.post('/api/tenders', postTender);
router.get('/api/tenders/:id', getTenderById);
router.put('/api/tenders/:id', updateTender);
router.delete('/api/tenders/:id', deleteTender);


export default router