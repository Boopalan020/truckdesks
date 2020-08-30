const mongoose = require('mongoose');

const memoSchema = new mongoose.Schema({
    vehicle_id : String,
    Memo :
    [
        {
            Calc_Date : { type : Date, default : Date.now },
            Trip_Date : 
            {
                From : String,
                To : String
            },
            Driver_name : String,
            Kilo_Meter : 
            {
                Start : Number,
                end : Number,
                Total_km : Number
            },
            Milege : String ,
            Loads : 
            [
                {
                    Load_date : String,
                    Place : 
                    {
                        Source : String,
                        Destination : String
                    },
                    Load_type : String,
                    Load_weight : Number,
                    Load_rent : Number,
                    Loading_cost : Number,
                    Unloading_cost : Number,
                    Commission : Number
                }
            ],
            Other_expense : 
            {
                New_tyre : Number,
                Old_tyre : Number,
                Reason : [],
                Amount : []
            },
            Diesel :
            [
                {
                    Filled_date : "13-Mar-20",
                    Litre : Number,
                    Amount : Number,
                    Current_rate : String,
                    Place : String
                }
            ],
            RTO_PC :
            {
                Place : [],
                Amount : [],
                Total : 1200
            },
            Over_all :
            {
                Diesel : Number,
                Commission : Number,
                Loading : Number,
                Unloading : Number,
                Others : Number,
                Driver_Salary :	Number,
                Cleaner_Salary : Number,
                Pathayam : Number,
                RTO_PC : Number,
                Workshop : Number,
                Toll_gate : Number
            },
            Final_Balance :
            {
                Income : Number,
                Expense : Number,
                Hands_on : Number,
                Income_day : Number,
                Income_km : Number,
                Expense_km : String
            }
        }
    ],
})

const memo = mongoose.model("vehicle", memoSchema)
module.exports = memo