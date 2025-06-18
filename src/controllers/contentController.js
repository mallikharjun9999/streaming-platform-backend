const getDBConnection = require('../config/database');
const contentModel = require('../models/content'); 

// Get all content
const getAllContent = async (req, res) => {
  try {
    const db = await getDBConnection();
    console.log('Fetching all content from the database');
    const content = await contentModel.getAllContent(db);
    res.status(200).json(content);
  } catch (e) {
    console.error('Error fetching content:', e);
    res.status(500).json({ error: 'Error fetching content' });
  }
};

// Get content by ID
const getContentById = async (req, res) => {
  const { contentId } = req.params;
  try {
    const db = await getDBConnection();
    console.log('Fetching content by ID:', contentId);
    if (!contentId) {
      return res.status(400).json({ error: 'Content ID is required' });
    }
    const item = await contentModel.getContentById(db, contentId);
    if (!item) {
      return res.status(404).json({ error: 'Content not found' });
    }
    res.status(200).json(item);
  } catch (e) {
    console.error('Error fetching content by ID:', e);
    res.status(500).json({ error: 'Error fetching content' });
  }
};

module.exports = {
  getAllContent,
  getContentById
};
