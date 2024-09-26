const mongoose = require("mongoose")

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    redirectURL: {
        type: String,
        required: true,
    },
    visitHistory: [
        // array of objects
        // dekh sakte he ki kitne baje click hua tha
        {
            timestamp: {
                type: Number
            }
        }
    ]
}, {timestamps: true})


const URL = mongoose.model("URL", urlSchema)

module.exports = URL;