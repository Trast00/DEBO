import express from 'express'
import { getSavedTendersByUuid, updateHiddenTenderById, updateSavedTenderById, updateViewedTenderById } from '../controllers/userPreferencesController.js'
console.log("Start User Profile Routing")
const router = express.Router()
router.get('/api/users/:uuid/preferences/tenders/saved', getSavedTendersByUuid)
router.post('/api/users/:uuid/preferences/tenders/hidden', updateHiddenTenderById)
router.post('/api/users/:uuid/preferences/tenders/saved', updateSavedTenderById)
router.post('/api/users/:uuid/preferences/tenders/viewed', updateViewedTenderById)

export default router