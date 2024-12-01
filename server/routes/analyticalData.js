import express from 'express'
import {postAnalyticalData} from '../controllers/analyticalData'


const router = express.Router()

router.post('/analytical_data', postAnalyticalData)

export default router