const mongoose = require('mongoose');
const yearlySchema = new mongoose.Schema({
    vehicle_id : String,
    yearly_Det:
    [
        {
            national_date : String,
            national_cost : Number,
            insurance_date : String,
            insurance : Number,
            rto : Number,
            fc_date : String,
            fc : Number,
            quarter_tax_date : String,
            quarter_tax : Number,
            year : String,
            status : String
        }
    ],
});
const yearly = mongoose.model("yearly", yearlySchema)
module.exports = yearly