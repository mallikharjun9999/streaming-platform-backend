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
  async getUserSubscription(db, userId) {
    return await db.get(`
      SELECT us.*, sp.name, sp.price, sp.max_devices, sp.max_quality, sp.allow_live, sp.allow_kids, sp.concurrent_streams
      FROM user_subscriptions us
      JOIN subscription_plans sp ON us.plan_id = sp.id
      WHERE us.user_id = ? AND us.is_active = 1 AND DATE('now') BETWEEN us.start_date AND us.end_date
    `, [userId])
  },

  async createSubscription(db, { userId, planId, startDate, endDate }) {
    return await db.run(
      `INSERT INTO user_subscriptions (user_id, plan_id, start_date, end_date) VALUES (?, ?, ?, ?)`,
      [userId, planId, startDate, endDate]
    )
  }
}
