
module.exports = {
  async getAllContent(db, filters = {}) {
    let query = `SELECT * FROM content WHERE 1=1`
    const params = []

    if (filters.type) {
      query += ` AND type = ?`
      params.push(filters.type)
    }

    if (filters.genre) {
      query += ` AND genre = ?`
      params.push(filters.genre)
    }

    if (filters.language) {
      query += ` AND language = ?`
      params.push(filters.language)
    }

    if (filters.region) {
      query += ` AND region = ?`
      params.push(filters.region)
    }

    return await db.all(query, params)
  },

  async getContentById(db, contentId) {
    return await db.get(`SELECT * FROM content WHERE id = ?`, [contentId])
  }
}
