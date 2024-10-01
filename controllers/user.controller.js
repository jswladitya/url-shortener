const { v4: uuidv4 } = require("uuid")
const User = require('../models/user.model.js')
const {setUser} = require("../service/auth.js")

async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;

    await User.create({
        name,
        email,
        password,
    })

    return res.redirect("/")
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password })

    if (!user) res.render("login", {
        error: "Invalid Username Or Password"
    });

    const sessionId = uuidv4(); //generated unique id
    setUser(sessionId, user);
    res.cookie("uid", sessionId)
    return res.redirect("/")

}

module.exports = { handleUserSignup, handleUserLogin };