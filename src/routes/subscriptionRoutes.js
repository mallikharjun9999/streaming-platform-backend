const express = require('express')
const router = express.Router()
const subscriptionController = require('../controllers/subscriptionController')
const {subscribe} = require('../controllers/subscriptionController')
const auth = require('../middleware/auth')

// Get available subscription plans
router.get('/plans', subscriptionController.getPlans)

// Subscribe to a plan
router.post('/subscribe', auth, subscribe)
router.get('/user', auth, subscriptionController.getUserSubscription)

module.exports = router
