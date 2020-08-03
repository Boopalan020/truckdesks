const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
    drivername : String,
    license : String,
    address : String,
    phone : String,
})

const driver = mongoose.model("drivers", driverSchema)
module.exports = driver