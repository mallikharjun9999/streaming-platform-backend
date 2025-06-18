console.log("🔧 Starting app.js...");
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const app = express()

dotenv.config()

// Middlewares
app.use(cors())
app.use(express.json())

// Routes
const authRoutes = require('./routes/authRoutes')
const profileRoutes = require('./routes/profileRoutes')
const contentRoutes = require('./routes/contentRoutes')
const streamRoutes = require('./routes/streamRoutes')
const sportsRoutes = require('./routes/sportsRoutes')
const channelRoutes = require('./routes/channelRoutes')
const subscriptionRoutes = require('./routes/subscriptionRoutes')
const watchlistRoutes = require('./routes/watchlistRoutes')


app.use('/api/auth', authRoutes)
app.use('/api/profile', profileRoutes) 
app.use('/api/content', contentRoutes)
app.use('/api/stream', streamRoutes)
app.use('/api/sports', sportsRoutes)
app.use('/api/channels', channelRoutes)
app.use('/api/subscriptions', subscriptionRoutes)
app.use('/api/watchlist', watchlistRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`)
  })

module.exports = app
