const express = require('express')
const router = express.Router()
const sportsController = require('../controllers/sportsController')
const auth = require('../middleware/auth')

// Sports events and scores
router.get('/events', auth, sportsController.getAllSportsEvents)
router.get('/scores/:eventId', auth, sportsController.getScoresByEventId)
router.get('/live-events', auth, sportsController.getLiveEvents)
router.get('/events/:eventId', auth, sportsController.getEventById) 


module.exports = router
