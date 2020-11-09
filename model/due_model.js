const mongoose = require('mongoose')
const vehicleDueSchema = new mongoose.Schema({
    vehicle_id : String,
    total_due_amount : String,
    due_interest : String,
    total_months : String,
    completed_month : String,
    dues : [],
});
const vehicleDue = mongoose.model("due", vehicleDueSchema)
module.exports = vehicleDue