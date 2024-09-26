const express = require("express");
const urlRoute = require('./routes/url.routes.js')
const URL = require("./models/url.model.js")
const { connectToMongoDB } = require("./connect.js")

const path = require("path")
const staticRoute = require("./routes/staticRouter.js")

const app = express();
const PORT = 8001

connectToMongoDB('mongodb://127.0.0.1:27017/short-url').then(() => console.log("mongoDb connected"))

// ejs install karne ke baad express ko batana padta he ki mujhe konsa view engine use karna he server side rendering karne ke lie & hame apne express ko ye bhi batana he ki hamare views kaha he using 'path' module
app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));

//these 2 middleware's tells ki we are supporting/accepting request as a json & form data both
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use("/url", urlRoute)

app.use("/", staticRoute)

//route
//user ko redirect karna he given shortId se jude link pe
app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
        // visitHistory ek array he to mujhe isme push karna he current date 
        $push: {
            visitHistory: {
                timestamp: Date.now()
            },
        }
    });
    res.redirect(entry.redirectURL);
})

app.listen(PORT, () => console.log(`Server is listening at PORT: ${PORT}`))