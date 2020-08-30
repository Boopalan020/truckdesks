const vehicleRoute = require('express').Router()
const vehicle = require('../model/vehicle_model')
const yearly = require('../model/yearly_model');
const bodyparser = require('body-parser')

vehicleRoute.use(bodyparser.json())

vehicleRoute.post('/savevehicle', (req, res) => {
    console.log(req.body)
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
                        chasis_no  : req.body.vehicle_no,
                        vehicle_model : req.body.vehicle_model,
                        engine_no : req.body.engine_no,
                        total_due : req.body.total_due,
                        completed_due : req.body.completed_due
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
                                    insurance : req.body.insurance,
                                    insurance_date : req.body.insurance_date,
                                    rto : req.body.rto,
                                    fc : req.body.fc,
                                    fc_date : req.body.fc_date,
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