module.exports = {
  async getUserByEmail(db, email) {
    return await db.get(`SELECT * FROM users WHERE email = ?`, [email])
  },

  async getUserById(db, userId) {
    return await db.get(`SELECT * FROM users WHERE id = ?`, [userId])
  },

  async createUser(db, { name, email, password, country }) {
    const result = await db.run(
      `INSERT INTO users (name, email, password, country) VALUES (?, ?, ?, ?)`,
      [name, email, password, country]
    )
    return result.lastID
  }
}
