
module.exports = {
  async getUserProfiles(db, userId) {
    console.log("🔧 Fetching profiles for user ID:", userId)
    return await db.all(`SELECT * FROM profiles WHERE user_id = ?`, [userId])
  },

  async createProfile(db, userId, profileData) {
    const { name, is_kids, language_preference } = profileData
    const result = await db.run(`
      INSERT INTO profiles (user_id, name, is_kids, language_preference)
      VALUES (?, ?, ?, ?)
    `, [userId, name, is_kids, language_preference])

    return {
      id: result.lastID,
      user_id: userId,
      name,
      is_kids,
      language_preference
    }
  }
}
