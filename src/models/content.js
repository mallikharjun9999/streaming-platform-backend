module.exports = {
  async getAllContent(db) {
    console.log('Fetching all content from the database')
    if (!db) {
      throw new Error('Database connection is not established')
    }
    return await db.all(`SELECT * FROM content`)
  },

  async getContentById(db, contentId) {
    return await db.get(`SELECT * FROM content WHERE id = ?`, [contentId])
  },

  async getContentByLanguage(db, language) {
    return await db.all(`SELECT * FROM content WHERE language = ?`, [language])
  },

  async searchContent(db, keyword) {
    return await db.all(
      `SELECT * FROM content WHERE title LIKE ? OR description LIKE ?`,
      [`%${keyword}%`, `%${keyword}%`]
    )
  }
}
