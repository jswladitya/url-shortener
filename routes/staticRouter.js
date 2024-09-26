//static frontend pages ke lie routing
const express = require("express")
const URL = require("../models/url.model.js")
const router = express.Router()


// home ko utha ke render 
router.get("/",async (req, res) => {
    const allurls = await URL.find({})
    return res.render('home', {
        // variables bhi send karsakte he
        urls : allurls
    } )
})

module.exports = router;