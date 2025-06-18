const express = require('express')
const router = express.Router()
const contentController = require('../controllers/contentController')
const auth = require('../middleware/auth')


router.get('/', auth, contentController.getAllContent)
router.get('/:contentId', auth, contentController.getContentById)

module.exports = router
