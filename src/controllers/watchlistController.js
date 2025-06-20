const getDBConnection = require('../config/database')
const watchlistModel = require('../models/watchlist')

const getWatchlist = async (req, res) => {
  const profileId = req.body.profileId  // Assumes frontend sends ?profileId=1
  if (!profileId) return res.status(400).json({ error: 'profileId required' })

  try {
    const db = await getDBConnection()
    const items = await watchlistModel.getUserWatchlist(db, profileId)
    res.json(items)
  } catch (e) {
    console.error(e)
    res.status(500).send('Error fetching watchlist')
  }
}

const addToWatchlist = async (req, res) => {
  const profileId = req.body.profileId
  const contentId = req.body.contentId
  if (!profileId || !contentId)
    return res.status(400).json({ error: 'profileId and contentId required' })

  try {
    const db = await getDBConnection()
    await watchlistModel.addToWatchlist(db, profileId, contentId)
    res.send('Added to watchlist')
  } catch (e) {
    console.error(e)
    res.status(500).send('Error adding to watchlist')
  }
}

const removeFromWatchlist = async (req, res) => {
  const profileId = req.body.profileId
  const contentId = req.body.contentId
  if (!profileId || !contentId)
    return res.status(400).json({ error: 'profileId and contentId required' })

  try {
    const db = await getDBConnection()
    await watchlistModel.removeFromWatchlist(db, profileId, contentId)
    res.send('Removed from watchlist successfully')
  } catch (e) {
    console.error(e)
    res.status(500).send('Error removing from watchlist')
  }
}

module.exports = {
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist
}
