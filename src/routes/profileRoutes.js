const express = require('express')
const router = express.Router()
const profileController = require('../controllers/profileController')
console.log('profileController:', profileController);
const auth = require('../middleware/auth')

// View and update user profile
router.get('/', auth, profileController.getUserProfile)
router.put('/', auth, profileController.updateUserProfile)

module.exports = router
