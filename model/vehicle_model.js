const mongoose = require('mongoose');
const vehicleSchema = new mongoose.Schema({
    vehicle_no : String,
    basic_info :
    {
        chasis_no  : String,
        vehicle_model : String,
        engine_no : String,
        total_due : Number,
        completed_due : Number
    }
});
const vehicle = mongoose.model("vehicle", vehicleSchema)
module.exports = vehicle