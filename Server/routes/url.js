const express = require('express');
const { handleGenerateNewShortURL, handleGetAnalytics, handleRedirectByShortID, handleGetUserUrls } = require('../controllers/url');

const router = express.Router()

router.post('/', handleGenerateNewShortURL)
router.get('/:_id', handleGetUserUrls)
router.get('/redirect/:shortId', handleRedirectByShortID)
router.get('/analytics/:shortId', handleGetAnalytics)


module.exports = router;