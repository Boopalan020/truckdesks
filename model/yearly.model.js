const mongoose = require('mongoose');
const yearlySchema = new mongoose.Schema({
    vehicle_id : String,
    yearly_Det:
    [
        {
            insurance : Number,
            rto : Number,
            fc : Number,
            quarter_tax : Number,
            year : Number,
            status : String
        }
    ],
});
const yearly = mongoose.model("vehicle", yearlySchema)
module.exports = yearly