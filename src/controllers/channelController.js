const getDBConnection = require('../config/database')
const channel = require('../models/channel')

const getAllChannels = async (req, res) => {
  try {
    console.log('Fetching all channels from the database')
    const db = await getDBConnection()
    const channels = await channel.getAllChannels(db)
    console.log('Channels fetched successfully')
    if (!channels) {
      return res.status(404).json({ error: 'No channels found' })
    }
    res.json(channels)
  } catch (e) {
    res.status(500).send('Error fetching channels')
  }
}
const getProgramsByChannel = async(req,res)=>{
  const { channelId } = req.params
  try {
    const db = await getDBConnection()
    if (!channelId) {
      return res.status(400).json({ error: 'Channel ID is required' })
    }
    const programs = await channel.getProgramsByChannel(db, channelId)
    if (!programs) {
      return res.status(404).json({ error: 'Programs not found for this channel' })
    }
    res.json(programs)
  } catch (e) {
    res.status(500).send('Error fetching programs for channel')
  }
}

module.exports = { getAllChannels,getProgramsByChannel }