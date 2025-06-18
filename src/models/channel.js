module.exports = {
  async getAllChannels(db) {
    console.log('inside getAllChannels model function')
    if (!db) {
      throw new Error('Database connection is not established')
    }
    return await db.all(`SELECT * FROM channels`)
  },

  async getProgramsByChannel(db, channelId) {
    return await db.all(`SELECT * FROM channel_programs WHERE channel_id = ?`, [channelId])
  }
}
