const express = require('express')
const router = express.Router()
const channelController = require('../controllers/channelController')
const auth = require('../middleware/auth')

// TV channels and programs
router.get('/', auth, channelController.getAllChannels)
router.get('/:channelId/programs', auth, channelController.getProgramsByChannel)

module.exports = router
