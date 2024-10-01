//routing for static frontend pages
const express = require("express")
const URL = require("../models/url.model.js")
const router = express.Router()


// render home page here
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