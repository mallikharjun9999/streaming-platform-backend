module.exports = {
  async getUserSubscription(db, userId) {
    return await db.get(
      `SELECT * FROM user_subscriptions WHERE user_id = ? ORDER BY start_date DESC LIMIT 1`,
      [userId]
    )
  },

  async getPlanById(db, planId) {
    return await db.get(`SELECT * FROM subscription_plans WHERE id = ?`, [planId])
  },

  async getAllPlans(db) {
    return await db.all(`SELECT * FROM subscription_plans`)
  },

  async createSubscription(db, { userId, planId, startDate, endDate }) {
    return await db.run(
      `INSERT INTO user_subscriptions (user_id, plan_id, start_date, end_date) VALUES (?, ?, ?, ?)`,
      [userId, planId, startDate, endDate]
    )
  }
}
