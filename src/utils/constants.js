module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || 'default_fallback_secret', // fallback for dev

  SUBSCRIPTION_PLANS: {
    BASIC: 'Basic',
    STANDARD: 'Standard',
    PREMIUM: 'Premium',
  },

  MAX_DEVICES_PER_PLAN: {
    Basic: 1,
    Standard: 2,
    Premium: 4,
  },

  MAX_STREAMS_PER_PLAN: {
    Basic: 1,
    Standard: 2,
    Premium: 4,
  },

  SUPPORTED_LANGUAGES: ['en', 'hi', 'te', 'ta', 'ml', 'bn'],

  DEFAULT_REGION: 'IN',
}
