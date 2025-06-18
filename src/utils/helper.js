const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { JWT_SECRET } = require('./constants')

module.exports = {
  generateJWT(user) {
    return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '24h',
    })
  },

  verifyJWT(token) {
    try {
      return jwt.verify(token, JWT_SECRET)
    } catch (err) {
      return null
    }
  },

  async hashPassword(password) {
    const saltRounds = 10
    return await bcrypt.hash(password, saltRounds)
  },

  async comparePassword(password, hash) {
    return await bcrypt.compare(password, hash)
  },

  getCurrentTimestamp() {
    return new Date().toISOString()
  },

  isLive(eventStart, eventEnd) {
    const now = new Date()
    return new Date(eventStart) <= now && now <= new Date(eventEnd)
  }
}
