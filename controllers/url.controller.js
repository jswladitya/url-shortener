const shortid = require("shortid")
// it generates random shortId's whenever it get called

const URL = require('../models/url.model.js')

async function handleGenerateNewShortUrl(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error : 'URL is required' })
    const shortID = shortid();
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: []
    })

    return res.render("home", {id: shortID})
}


// kitne clicks he konsa time he
async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;

    // result me url ka pura schema nikal lenge as a object
    const result = await URL.findOne({ shortId })

    return res.json(
        { 
            totalClicks: result.visitHistory.length, 
            analytics: result.visitHistory 
        }
    )
}

module.exports = {
    handleGenerateNewShortUrl,
    handleGetAnalytics
}
// controllers ka data import hoga routes me , routes import hoga index me