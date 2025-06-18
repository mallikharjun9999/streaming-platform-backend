module.exports = {
  async getViewingHistory(db, userId) {
    return await db.all(`SELECT * FROM viewing_history WHERE user_id = ?`, [userId])
  },

  async addViewingEntry(db, userId, contentId, timestamp) {
    return await db.run(
      `INSERT INTO viewing_history (user_id, content_id, timestamp) VALUES (?, ?, ?)`,
      [userId, contentId, timestamp]
    )
  },

  async getConcurrentStreams(db, userId) {
    return await db.all(
      `SELECT * FROM viewing_history WHERE user_id = ? AND timestamp > datetime('now', '-1 hour')`,
      [userId]
    )
  }
}
