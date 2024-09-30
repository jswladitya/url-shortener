//static frontend pages ke lie routing
const express = require("express")
const URL = require("../models/url.model.js")
const router = express.Router()


// home.ejs ko utha ke render 
router.get("/", async (req, res) => {
    const allurls = await URL.find({})
    return res.render('home', {
        // we can even send multiple variables along with view
        urls : allurls
    } )
})


router.get('/signup', (req , res) => {
    return res.render("signup")
})

router.get('/login', (req , res) => {
    return res.render("login")
})

module.exports = router;