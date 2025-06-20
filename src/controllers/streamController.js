const getDBConnection = require('../config/database')
const contentModel = require('../models/content')
const { generateDRMToken } = require('../utils/drm')

const getStreamUrl = async (req, res) => {
  const { contentId } = req.params
  const userId = req.user?.id

  try {
    const db = await getDBConnection()
    const content = await contentModel.getContentById(db, contentId)
    
    if (!content) {
      return res.status(404).json({ error: 'Content not found' })
    }

    // Generate DRM token and stream URL
    const drmToken = generateDRMToken(userId, contentId)
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    res.json({
      stream_url: `https://example.com/stream/content${contentId}.m3u8`,
      drm_token: drmToken,
      expires_at: expiresAt.toISOString()
    })
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Error getting stream URL' })
  }
}

module.exports = { getStreamUrl }
