//connection to DB=========================

const mongoose = require("mongoose")

const uri = "mongodb://localhost:27017/prt28th"
const connection = async()=>{
    await mongoose.connect(uri)
    console.log("connected to DB");
}

module.exports = connection
