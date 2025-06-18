const getDBConnection = require('../config/database')
const subscriptionMiddleware = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const db = await getDBConnection();
    const query = `
      SELECT 1
      FROM user_subscriptions
      WHERE user_id = ?
        AND is_active = 1
        AND DATE('now') BETWEEN start_date AND end_date
      LIMIT 1
    `;

    const result = await db.get(query, [userId]);

    if (!result) {
      return res.status(403).json({ error: 'You need an active subscription to access this content.' });
    }

    next();
  } catch (error) {
    console.error('Subscription middleware error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = subscriptionMiddleware;
