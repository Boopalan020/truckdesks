const mongoose = require('mongoose')
const vehicleSchema = new mongoose.Schema({
    vehicle_no : String,
    basic_info :
    {
        reg_date : String,
        chasis_no  : String,
        vehicle_model : String,
        engine_no : String,
    }
});
const vehicle = mongoose.model("vehicle", vehicleSchema)
module.exports = vehicle