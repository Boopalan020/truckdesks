const mongoose = require('mongoose');
const yearlySchema = new mongoose.Schema({
    vehicle_id : String,
    yearly_Det:
    [
        {
            insurance : Number,
            insurance_date : String,
            rto : Number,
            fc : Number,
            fc_date : String,
            quarter_tax : Number,
            status : String
        }
    ],
});
const yearly = mongoose.model("yearly", yearlySchema)
module.exports = yearly