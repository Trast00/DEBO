import express from 'express';
import { getCountries } from '../controllers/countryController.js';
const router = express.Router();

router.get('/countries', getCountries);

export default router