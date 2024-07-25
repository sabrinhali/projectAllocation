const mongoose = require("mongoose")
const NoticesModel = mongoose.Schema({
    title: {
        type: String,
        require: true
        
    },
    file: {
        type: String,
        require: true,
    },
})
module.exports = mongoose.model("Notices", NoticesModel)