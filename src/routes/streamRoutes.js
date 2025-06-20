const express = require('express')
const router = express.Router()
const {getStreamUrl} = require('../controllers/streamController')
const auth = require('../middleware/auth')
const subscription = require('../middleware/subscription')
const deviceLimit = require('../middleware/deviceLimit')
const geoRestriction = require('../middleware/geoRestriction')

// Stream video
router.get('/:contentId/stream', auth, subscription, deviceLimit, geoRestriction,getStreamUrl)

module.exports = router
