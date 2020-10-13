const memoRoute = require('express').Router()
const memos = require('../model/memo_model')
const vehicle = require("../model/vehicle_model")
const bodyparser = require('body-parser')
const fs = require('fs')

memoRoute.use(bodyparser.json())

// Sending PDF to frontend to generate PDF file
memoRoute.get('/getpdf', (req, res) => {
    const src = fs.createReadStream('./MainMemo.pdf');

    res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=MainMemo.pdf',
        'Content-Transfer-Encoding': 'Binary'
    });

    console.log(src)
    src.pipe(res);
})

// Stores Memo data to the DataBase
memoRoute.post('/savememo', (req, res) => {
    const recv = req.body.data
    console.log(recv.Loads)

    vehicle.findOne({vehicle_no : recv.vehicle_no})
    .then(result => {
        console.log(result)
        if(result)
        {
            console.log("Vehicle Found!!! Saving Memo...")
            // memos.find().then(fres => {
            //     console.log(fres[0].Memo)
            // })
            // .catch(err => console.log(err))
            memos.updateOne({
                vehicle_id : result._id,
            }, 
            {
               $push : {
                    Memo : {
                        calc_date : recv.calc_date,
                        from : recv.from,
                        to : recv.to,
                        driver_name : recv.driver_name,
                        cleaner_name : recv.cleaner_name,
                        advance_amount : recv.advance_amount,
                        start_km : recv.start_km,
                        end_km : recv.end_km,
                        total_km : recv.total_km,
                        milege : recv.milege,
                        new_tyre : recv.new_tyre,
                        old_tyre : recv.old_tyre,
                        total_diesel_litre : recv.total_diesel_litre,
                        trip_duration : recv.trip_duration,
                        total_diesel_amount : recv.total_diesel_amount,
                        total_commission : recv.total_commission,
                        total_loading : recv.total_loading,
                        total_unloading : recv.total_unloading,
                        total_expense : recv.total_expense,
                        driver_salary : recv.driver_salary,
                        cleaner_salary : recv.cleaner_salary,
                        pathayam : recv.pathayam,
                        total_rto : recv.total_rto,
                        workshop : recv.workshop,
                        toll_gate : recv.toll_gate,
                        total_rent : recv.total_rent,
                        bill_padi : recv.bill_padi,
                        trip_expense : recv.trip_expense,
                        final_balance : 
                        {
                            hands_on : recv.final_balance.hands_on,
                            income_day : recv.final_balance.income_day,
                            income_km : recv.final_balance.income_km,
                            expense_km : recv.final_balance.expense_km
                        }
                    }
               } 
            }, { upsert : true }).then(upres => {
                console.log(upres)
            }).catch(err => {
                console.log(err)
            })
        }
    })
    .catch(err => {
        console.log(err)
    })
    
    // Find whether the vehicle is present or not 
    // If present store corresponding vehicle ID and Memo

    res.end()
})

module.exports = memoRoute