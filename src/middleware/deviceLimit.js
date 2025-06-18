const getDBConnection = require('../config/database')
const deviceLimitMiddleware = async (req, res, next) => {
  const userId = req.user.id;

  try {
    // Get max devices allowed for the user's active subscription
    const db = await getDBConnection();
    const subscription = await db.get(
      `SELECT sp.max_devices FROM user_subscriptions us
       JOIN subscription_plans sp ON us.plan_id = sp.id
       WHERE us.user_id = ?
         AND us.is_active = 1
         AND DATE('now') BETWEEN us.start_date AND us.end_date
       LIMIT 1`,
      [userId]
    );

    if (!subscription) {
      return res.status(403).json({ error: 'Active subscription not found.' });
    }

    // Count the number of devices currently used
    const devicesUsed = await db.get(
      `SELECT COUNT(*) as count FROM devices WHERE user_id = ?`,
      [userId]
    );

    if (devicesUsed.count >= subscription.max_devices) {
      return res.status(403).json({ error: 'Device limit exceeded for your plan.' });
    }

    next();
  } catch (error) {
    console.error('Device limit middleware error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = deviceLimitMiddleware;
