const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const getDBConnection = require('../config/database')
let db = null
const registerUser = async (req, res) => {
  const {email, password, name, phone, country } = req.body
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    db = await getDBConnection()
    console.log("🔧 User details:", {email,password, name, phone, country })
    await db.run(
      'INSERT INTO users (email, password_hash, name, phone, country) VALUES (?, ?, ?, ?, ?)',
      [email, hashedPassword,name,phone,country]
    )
    res.status(201).send('User registered successfully')
  } catch (e) {
    res.status(500).send('Error registering user: ' + e.message)
  }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body
  try {
    const db = await getDBConnection()
    const user = await db.get('SELECT * FROM users WHERE email = ?', [email])

    if (user && await bcrypt.compare(password, user.password_hash)) {
      const token = jwt.sign({ id: user.id }, 'MysuperSecretKey')  
      console.log("🔧 User logged in:", { email })
      res.json({ token })
    } else {
      res.status(401).send('Invalid credentials')
    }
  } catch (e) {
    console.error('Login error:', e)
    res.status(500).send('Login error')
  }
}

module.exports = {
  registerUser,
  loginUser,
}
