import express from 'express';
import {getIndustryTypes, getIndustryTypeByName, postIndustryType, deleteIndustryType} from '../controllers/industryTypesController.js';
console.log("Start Industry Type Routing")
const router = express.Router();

router.get('/api/industryTypes', getIndustryTypes);
router.get('/api/countries', getIndustryTypes);

router.get('/api/industryTypes/:name', getIndustryTypeByName);

router.post('/api/industryTypes', postIndustryType);

router.delete('/api/industryTypes', deleteIndustryType);

export default router