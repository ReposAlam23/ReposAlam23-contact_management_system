const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: Number, required: true}
})

const SCHEMA = mongoose.model("user", userSchema)

module.exports = SCHEMA