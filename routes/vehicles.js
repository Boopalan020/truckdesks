const vehicleRoute = require('express').Router()
const vehile = require('../model/vehicle.model')
const bodyparser = require('body-parser')
const vehicle = require('../model/vehicle.model')

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
                new vehicle({
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
                .then(ress => {
                    if(ress)
                    {
                        console.log("Vehicle added successfully")
                        res.status(200).send({flag : "new", msg :"Saved Successfully"})
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