module.exports = {
  async getLiveEvents(db) {
    return await db.all(`SELECT * FROM sports_events WHERE is_live = 1`)
  },

  async getEventById(db, eventId) {
    return await db.get(`SELECT * FROM sports_events WHERE id = ?`, [eventId])
  },

  async getScoresByEventId(db, eventId) {
    return await db.all(`SELECT * FROM sports_scores WHERE event_id = ?`, [eventId])
  },
  async getAllSportsEvents(db){
    return await db.all(`SELECT * FROM sports_events`)
  }
}
