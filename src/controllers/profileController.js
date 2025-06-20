const getDBConnection = require('../config/database')
const profileModel = require('../models/profile')
let db = null

const getUserProfile = async (req, res) => {
  try {
    db = await getDBConnection()
    const userId = req.user?.id 
    console.log("🔧 User ID:", userId)

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const user = await db.get(
      `SELECT id, email, name, phone, country FROM users WHERE id = ?`,
      [userId]
    )

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.status(200).json(user)
  } catch (error) {
    console.error('Error fetching profile:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
const getUserProfiles = async (req, res) => {
  try {
    const userId = req.user?.id
    console.log("🔧 User ID:", userId)
    const db = await getDBConnection()
    const profiles = await profileModel.getUserProfiles(db, userId)
    res.json(profiles)
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Error fetching profiles' })
  }
}

const updateUserProfile = async (req, res) => {
  try {
    const db = await getDBConnection()
    const userId = req.user?.id
    const { email,name, phone,country } = req.body

    const user = await db.get(`SELECT * FROM users WHERE id = ?`, [userId])
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    await db.run(
      `UPDATE users SET email = ?, name = ?,phone=?,country = ? WHERE id = ?`,
      [email || user.email, name || user.name, phone || user.phone, country || user.country, userId]
    )

    res.status(200).json({ message: 'Profile updated successfully' })
  } catch (error) {
    console.error('Error updating profile:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
const createProfile = async (req, res) => {
  const { name, is_kids = false, language_preference = 'en' } = req.body
  const userId = req.user.id

  if (!name) {
    return res.status(400).json({ error: 'Profile name is required' })
  }

  try {
    const db = await getDBConnection()
    const profile = await profileModel.createProfile(db, userId, { name, is_kids, language_preference })
    res.status(201).json({
      message: 'Profile created successfully',
      profileId: profile.id
    })
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Error creating profile' })
  }
}
module.exports = {
  getUserProfile,
  updateUserProfile,
  createProfile,
  getUserProfiles
}
