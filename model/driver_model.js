const mongoose = require('mongoose');
const driverSchema = new mongoose.Schema({
    drivername : String,
    license : String,
    blood : String,
    address : String,
    age : String,
    phone : String,
    insure_no : String,
})
const driver = mongoose.model("drivers", driverSchema)
module.exports = driver