import express from 'express'
import { getSavedTendersByUuid, updateHiddenTenderById, updateSavedTenderById, updateViewedTenderById } from '../controllers/userPreferencesController.js'

const router = express.Router()
router.get('/users/:uuid/preferences/tenders/saved', getSavedTendersByUuid)
router.post('/users/:uuid/preferences/tenders/hidden', updateHiddenTenderById)
router.post('/users/:uuid/preferences/tenders/saved', updateSavedTenderById)
router.post('/users/:uuid/preferences/tenders/viewed', updateViewedTenderById)

export default router