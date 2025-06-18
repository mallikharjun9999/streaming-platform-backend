const getDBConnection = require('../config/database')
const geoRestrictionMiddleware= async (req, res, next) => {
  try {
    const db = await getDBConnection()
    const userId = req.user.id

    const user = await db.get(`SELECT country FROM users WHERE id = ?`, [userId])
    const contentId = req.params.contentId || req.body.contentId

    const restriction = await db.get(
      `SELECT restricted_countries FROM content WHERE id = ?`,
      [contentId]
    )

    const restrictedCountries = restriction?.restricted_countries?.split(',') || []

    if (restrictedCountries.includes(user.country)) {
      return res.status(403).json({ error: 'Content not available in your region.' })
    }

    next()
  } catch (err) {
    console.error('Geo restriction middleware error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = geoRestrictionMiddleware
