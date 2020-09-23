const mongoose = require('mongoose');
const { number } = require('yup');
const vehicleSchema = new mongoose.Schema({
    vehicle_no : String,
    basic_info :
    {
        reg_date : String,
        chasis_no  : String,
        vehicle_model : String,
        engine_no : String,
        total_due_amount : Number,
        due_interest : Number,
        total_months : Number,
        completed_month : Number
    }
});
const vehicle = mongoose.model("vehicle", vehicleSchema)
module.exports = vehicle