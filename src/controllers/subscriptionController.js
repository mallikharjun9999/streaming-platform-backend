const { get } = require('../app')
const getDBConnection = require('../config/database')
const subscription = require('../models/subscription')

// Get all plans
const getPlans = async (req, res) => {
  try {
    console.log('Fetching all subscription plans')
    const db = await getDBConnection()
    const plans = await subscription.getAllPlans(db)
    res.json(plans)
  } catch (e) {
    console.error('Error fetching plans:', e)
    res.status(500).send('Error fetching plans')
  }
}

// Subscribe user to a plan
const subscribe = async (req, res) => {
  const userId = req.user?.id
  console.log("🔧 User ID:", userId)
  const { planId } = req.body
  console.log("🔧 Plan ID:", planId)
  try {
    const db = await getDBConnection()
  
    const plan = await subscription.getPlanById(db, planId)
    if (!plan) {
      return res.status(400).json({ error: 'Invalid plan selected' })
    }

    const startDate = new Date().toISOString().split('T')[0] // yyyy-mm-dd
    const endDate = new Date(new Date().setMonth(new Date().getMonth() + 1))
      .toISOString()
      .split('T')[0] // +1 month

    await subscription.createSubscription(db, {
      userId,
      planId,
      startDate,
      endDate
    })

    res.json({ message: 'Subscribed successfully' })
  } catch (e) {
    console.error('Subscription failed:', e)
    res.status(500).send('Subscription failed')
  }
}
const getUserSubscription = async (req, res) => {
  try {
    const userId = req.user?.id
    const db = await getDBConnection()
    const user_subscription = await subscription.getUserSubscription(db, userId)
    
    if (!user_subscription) {
      return res.status(404).json({ error: 'No active subscription found' })
    }
    
    res.json(user_subscription)
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Error fetching user subscription' })
  }
}
module.exports = { getPlans, subscribe,getUserSubscription }
