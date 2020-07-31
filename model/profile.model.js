const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    firstname : String,
    lastname : String,
    nickname : String,
    mailid : String,
    phonenumber : String,
    password : String
})

const profile = mongoose.model("userprofile", ProfileSchema)
module.exports = profile