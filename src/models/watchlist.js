module.exports = {
  async getUserWatchlist(db, profileId) {
  return await db.all(
    `SELECT c.id, c.title, c.thumbnail_url, c.genre, c.language, c.type
     FROM watchlist w
     JOIN content c ON w.content_id = c.id
     WHERE w.profile_id = ?`,
    [profileId]
  )
}
,

  async addToWatchlist(db, profileId, contentId) {
    return await db.run(
      `INSERT INTO watchlist (profile_id, content_id) VALUES (?, ?)`,
      [profileId, contentId]
    )
  },

  async removeFromWatchlist(db, profileId, contentId) {
    return await db.run(
      `DELETE FROM watchlist WHERE profile_id = ? AND content_id = ?`,
      [profileId, contentId]
    )
  }
}
