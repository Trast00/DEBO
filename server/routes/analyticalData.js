import express from 'express'
import {postAnalyticalData} from '../controllers/analyticalData.js'

const router = express.Router()

router.post('/api/analytical_data', postAnalyticalData)

export default router