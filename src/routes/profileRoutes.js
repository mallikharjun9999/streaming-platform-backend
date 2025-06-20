const express = require('express')
const router = express.Router()
const profileController = require('../controllers/profileController')
const auth = require('../middleware/auth')

// View and update user profile
router.get('/', auth, profileController.getUserProfile)
router.put('/', auth, profileController.updateUserProfile)
router.get('/profiles', auth, profileController.getUserProfiles)    
router.post('/create-profile', auth, profileController.createProfile)

module.exports = router
