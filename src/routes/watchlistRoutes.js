const express = require('express')
const router = express.Router()
const watchlistController = require('../controllers/watchlistController')
const auth = require('../middleware/auth')

// Watchlist Routes
router.get('/', auth, watchlistController.getWatchlist)
router.post('/add', auth, watchlistController.addToWatchlist)
router.delete('/remove', auth, watchlistController.removeFromWatchlist)

module.exports = router
