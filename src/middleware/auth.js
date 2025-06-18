const jwt = require('jsonwebtoken')

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) {
    return res.status(401).json({ error: 'Access denied. Token missing.' })
  }

  jwt.verify(token, 'MysuperSecretKey', (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' })
    req.user = user 
    console.log("🔧 User authenticated:", { id: user.id, email: user.email })
    next()
  })
}

module.exports = authenticateToken