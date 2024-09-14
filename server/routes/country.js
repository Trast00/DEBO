import express from 'express';
import { getCountries } from '../controllers/countryController.js';
console.log("Start Country Routing")
const router = express.Router();

router.get('/api/countries', getCountries);

export default router