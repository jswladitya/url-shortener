const express = require("express");
const urlRoute = require('./routes/url.routes.js')
const userRoute = require("./routes/user.routes.js")
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
app.use("/user", userRoute)

app.use("/", staticRoute)

//route
//redirecting the user on the given shortID
app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
        // since visitHistory is empty now , so we are pushing Date in it
        // means how many times the url will be clicked , that many times new entry in visitHistory will me pushed or created into the database
        // by using this data we can find out the total clicks 
        $push: {
            visitHistory: {
                timestamp: Date.now()
            },
        }
    });
    res.redirect(entry.redirectURL);
})

app.listen(PORT, () => console.log(`Server is listening at PORT: ${PORT}`))