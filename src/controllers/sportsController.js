const getDBConnection = require('../config/database')
const sports = require('../models/sports')

const getScoresByEventId = async (req, res) => {
  try {
    const db = await getDBConnection()
    const scores = await sports.getScoresByEventId(db, req.params.eventId)
    res.json(scores)
  } catch (e) {
    res.status(500).send('Error fetching live scores')
  }
}
const getLiveEvents = async (req, res) => {
  try {
    const db = await getDBConnection()
    const events = await sports.getLiveEvents(db)
    res.json(events)
  } catch (e) {
    res.status(500).send('Error fetching live events')
  }
}
const getEventById = async (req, res) => {
  const { eventId } = req.params
  try {
    const db = await getDBConnection()
    console.log('Fetching event by ID:', eventId)
    if (!eventId) {
      return res.status(400).json({ error: 'Event ID is required' })
    }
    const event = await sports.getEventById(db, eventId)
    if (!event) {
      return res.status(404).json({ error: 'Event not found' })
    }
    res.json(event)
  } catch (e) {
    res.status(500).send('Error fetching event by ID')
  }
}

const getAllSportsEvents = async (req, res) => {
  try {
    const db = await getDBConnection()
    const events = await sports.getAllSportsEvents(db)
    res.json(events)
  } catch (e) {
    res.status(500).send('Error fetching all sports events')
  }
}

module.exports = { getEventById, getLiveEvents, getScoresByEventId,getAllSportsEvents }