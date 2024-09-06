import express from 'express';
import {getIndustryTypes, getIndustryTypeByName, postIndustryType, deleteIndustryType} from '../controllers/industryTypesController.js';
console.log("Start Industry Type Routing")
const router = express.Router();

router.get('/industryTypes', getIndustryTypes);
router.get('/countries', getIndustryTypes);

router.get('/industryTypes/:name', getIndustryTypeByName);

router.post('/industryTypes', postIndustryType);

router.delete('/industryTypes', deleteIndustryType);

export default router