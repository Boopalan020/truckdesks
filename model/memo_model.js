const mongoose = require('mongoose');

const memoSchema = new mongoose.Schema({
    vehicle_id : String,
    Memo :
    [
        {
            calc_date : String,
            from : String,
            to : String,
            driver_name : String,
            cleaner_name : String,
            advance_amount : String,
            start_km : Number,
            end_km : Number,
            total_km : Number,
            milege : String ,
            loads : [],
            new_tyre : String,
            old_tyre : String,
            expense_details : [
                {
                    reason : String,
                    amount : String
                }
            ],
            diesel :
            [
                {
                    filled_date : String,
                    litre : Number,
                    rate : Number,
                    rate_on_day : String,
                    place : String
                },
            ],
            total_diesel_litre : String,
            rto_details : 
            [
                {
                    place : String,
                    amount : String
                }
            ],
            trip_duration : String,
            total_diesel_amount : String,
            total_commission : String,
            total_loading : String,
            total_unloading : String,
            total_expense : String,
            driver_salary :	String,
            cleaner_salary : String,
            pathayam : String,
            total_rto : String,
            workshop : String,
            toll_gate : String,
            total_rent : String,
            bill_padi : String,
            trip_expense : String,

            final_balance :
            {
                hands_on : Number,
                income_day : Number,
                income_km : Number,
                expense_km : String
            }
        }
    ],
})

const memo = mongoose.model("memo", memoSchema)
module.exports = memo