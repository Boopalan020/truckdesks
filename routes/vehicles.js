const vehicleRoute = require('express').Router()
const vehicle = require('../model/vehicle_model')
const driver = require("../model/driver_model")
const yearly = require('../model/yearly_model')
const bodyparser = require('body-parser')

vehicleRoute.use(bodyparser.json())

vehicleRoute.get('/fetchnumbers', (req, res) => {
    vehicle.find({},{ vehicle_no : 1, _id : 0 })
    .then(vres => {
        console.log(vres)
        driver.find({}, {drivername : 1, _id : 0})
        .then(dres => {
            console.log(dres)
            res.status(200).send({v_no:vres, d_name:dres})
        })
        .catch(err => {
            console.log("Error in Fetching Driver Name :\n", err)
        })
    })
    .catch(err => {
        console.log("Error in fetching vehicle Number :\n",err)
    })
})

vehicleRoute.post('/savevehicle', (req, res) => {
    vehicle.findOne({vehicle_no : req.body.vehicle_no})
        .then(result => {
            if(result)
            {
                console.log("Vehicle Already exist")
                res.send({flag : "exist", msg: "Vehicle Already Exist"})
            }
            else
            {
                console.log("Vehicle Doest not exist")
                const save_Vehicle = new vehicle({
                    vehicle_no : req.body.vehicle_no,
                    basic_info :
                    {
                        reg_date : req.body.reg_date,
                        chasis_no  : req.body.chasis_no,
                        vehicle_model : req.body.vehicle_model,
                        engine_no : req.body.engine_no,
                        total_due_amount : req.body.total_due_amount,
                        due_interest : req.body.due_interest,
                        total_months : req.body.total_months,
                        completed_month : req.body.completed_month
                    }
                }).save()

                save_Vehicle.then(ress => {
                    if(ress)
                    {
                        console.log("Vehicle added successfully\nAdding Yearly Details...")
                        new yearly({
                            vehicle_id : ress._id,
                            yearly_Det : [
                                {
                                    national_date : req.body.national_date,
                                    national_cost : req.body.national_cost,
                                    insurance_date : req.body.insurance_date,
                                    insurance : req.body.insurance,
                                    rto : req.body.rto,
                                    fc_date : req.body.fc_date,
                                    fc : req.body.fc,
                                    quarter_tax_date : req.body.quarter_tax_date,
                                    quarter_tax : req.body.quarter_tax,
                                    status : req.body.status
                                }
                            ]
                        }).save()
                        .then(sres => {
                            if(sres)
                            {
                                console.log("Yearly Details added successfully")
                                res.status(200).send({flag : "new", msg :"Saved Successfully"})
                            }
                        })
                        .catch(err => {
                            console.log(err)
                            sres.send(err)
                        })
                    }
                })
                .catch(err => {
                    console.log(err)
                    res.send(err)
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.send(err)
        })

})
module.exports = vehicleRoute