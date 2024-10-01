const express = require("express")
const {handleGenerateNewShortUrl, handleGetAnalytics} = require('../controllers/url.controller.js')
const router = express.Router();

router.post('/' , handleGenerateNewShortUrl)
// takes original url & returns short url 

router.get('/analytics/:shortId', handleGetAnalytics )
// here if u pass a short url toh it will get total clicks and watch history

module.exports = router;