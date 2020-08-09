const mongoose = require('mongoose');
const vehicleSchema = new mongoose.Schema({
    basic_info :
    {
        vehicle_no : String,
        chasis_no  : String,
        vehicle_model : String,
        engine_no : String,
        due_details :
        {
            total_due : Number,
            completed_due : Number
        }
    }
});
const vehicle = mongoose.model("vehicle", vehicleSchema)
module.exports = vehicle