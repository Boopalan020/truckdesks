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

    vehicle.findOne({vehicle_no : recv.vehicle_no})
    .then(result => {
        // console.log(result)
        if(result)
        {
            console.log("Vehicle Found!!! Saving Memo...")
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
                console.log("Updated outer Details", "Pushing Inner Array details...")
                memos.findOne({vehicle_id : result._id}, function(err, memo){
                    if (memo)
                    {
                        // If exist , Update that
                        let mems = memo.Memo
                        for (let i = 0 ; i < mems.length ; i++)
                        {
                            if(mems[i].calc_date === recv.calc_date)
                            {
                                // Pushing expense details
                                console.log("Saving Expense Details...")
                                for( x = 0 ; x < recv.expense_details.length ; x++)
                                {
                                    mems[i].expense_details.push({
                                        reason : recv.expense_details[x].reason,
                                        amount : recv.expense_details[x].amount
                                    })
                                } 
                                
                                // Pushing Load details
                                console.log("Saving Load Details...")
                                for( x = 0 ; x < recv.loads.length ; x++)
                                {
                                    mems[i].loads.push({
                                        date : recv.loads[x].date,
                                        origin : recv.loads[x].origin,
                                        end_point: recv.loads[x].end_point,
                                        type : recv.loads[x].type,
                                        weight : recv.loads[x].weight,
                                        rent : recv.loads[x].rent,
                                        loading_cost : recv.loads[x].loading_cost,
                                        uloading_cost : recv.loads[x].unloading_cost,
                                        commission : recv.loads[x].commission 
                                    })
                                }

                                // Pushing expense details
                                console.log("Saving RTO Details...")
                                for( x = 0 ; x < recv.rto_details.length ; x++)
                                {
                                    mems[i].rto_details.push({
                                        place : recv.rto_details[x].place,
                                        amount : recv.rto_details[x].amount
                                    })
                                }
                                
                                // Pushing Diesel details
                                console.log("Saving diesel Details...")
                                for( x = 0 ; x < recv.diesel.length ; x++)
                                {
                                    mems[i].diesel.push({
                                        filled_date : recv.diesel[x].filled_date,
                                        litre : recv.diesel[x].litre,
                                        rate : recv.diesel[x].rate,
                                        rate_on_day : recv.diesel[x].rate_on_day,
                                        place : recv.diesel[x].place
                                    })
                                }
                            }
                        }
                        memo.save().then(upds => console.log(upds))
                    }
                })
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