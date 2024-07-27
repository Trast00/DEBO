import express from 'express'
import { updateHiddenTenderById, updateSavedTenderById, updateViewedTenderById } from '../controllers/userPreferencesController.js'

const router = express.Router()
console.log('preference routes')
router.post('/users/:uuid/preferences/tenders/hidden', updateHiddenTenderById)
router.post('/users/:uuid/preferences/tenders/saved', updateSavedTenderById)
router.post('/users/:uuid/preferences/tenders/viewed', updateViewedTenderById)

export default router