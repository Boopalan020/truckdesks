const vehicleRoute = require('express').Router()
const vehicle = require('../model/vehicle_model')
const driver = require("../model/driver_model")
const yearly = require('../model/yearly_model')
const due = require('../model/due_model')
const bodyparser = require('body-parser')

vehicleRoute.use(bodyparser.json())

vehicleRoute.get('/getvehicles', (req, res) => {
    vehicle.find({})
    .then(fvres => {
        // console.log(fvres)
        res.status(200).send(fvres);
    })
    .catch(err => {
        console.log("Error while fetching vehicle details : ",err)
    })
})

vehicleRoute.post('/saveduetable', (req, res) => {
    const id = req.body.id
    const completed_months = req.body.completed_months
    const dues = req.body.dues
    // console.log(dues)
    due.updateOne({ _id : id }, {
        $set : {
            completed_month : completed_months,
            dues : dues
        }
    })
    .then(updated => {
        console.log("Updated due Table successfully")
        res.status(200).send({msg : "Due Updated successfully"})
    })
    .catch(err => {
        console.log("Error while saving Due table",err)
        res.send(err)
    })
})

vehicleRoute.get('/getbyid/:id', (req, res) => {
    const id = req.params.id
    due.findOne({vehicle_id : id})
    .then(dueres => {
        // console.log("Found : ",dueres)
        res.status(200).send(dueres)
    })
    .catch(err => {
        console.log(`Erro in fetching vehicle id : ${id}`,err)
        res.send(err)
    })
})

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
                                    year : req.body.year,
                                    status : req.body.status
                                }
                            ]
                        }).save()
                        .then(sres => {
                            if(sres)
                            {
                                console.log("Yearly Details added successfully")

                                const temp_due_obj = [];

                                var dates = new Date(req.body.due_date)
                                
                                // Calculting Due per month 
                                const due_per_month = (parseInt(req.body.total_due_amount) / parseInt(req.body.total_months)).toFixed(2)

                                var i = 0;
                                if(req.body.completed_month > 0)
                                {
                                    for ( i = 0 ; i < req.body.completed_month ; i++)
                                    {
                                        dates.setMonth(dates.getMonth() + 1)
                                        temp_due_obj.push({
                                            due_date : dates.toLocaleDateString(),
                                            avl_due_amnt :  String((parseInt(req.body.total_due_amount) - ((i+1)*due_per_month)).toFixed(2)),
                                            status : true
                                        })
                                    }
                                }
                                for( var j = i ; j < req.body.total_months ; j++)
                                {
                                    dates.setMonth(dates.getMonth() + 1)
                                    temp_due_obj.push({
                                        due_date : dates.toLocaleDateString(),
                                        avl_due_amnt : String((parseInt(req.body.total_due_amount) - ((j+1)*due_per_month)).toFixed(2)),
                                        status : false
                                    })
                                }
                                console.log(temp_due_obj)
                                // Saving due data to DB collection
                                new due({
                                    vehicle_id : ress._id,
                                    total_due_amount : req.body.total_due_amount,
                                    due_interest : req.body.due_interest,
                                    total_months : req.body.total_months,
                                    completed_month : req.body.completed_month,
                                    dues : temp_due_obj
                                }).save()
                                .then(dueRes => {
                                    res.status(200).send({flag : "new", msg :"Saved Successfully"})
                                })
                                .catch(err => {
                                    console.log('Error while saving due collection',err)
                                    res.send(err)
                                })
                                // res.status(200).send({flag : "new", msg :"Saved Successfully"})
                            }
                        })
                        .catch(err => {
                            console.log('Error while saving yearly collections',err)
                            res.send(err)
                        })
                    }
                })
                .catch(err => {
                    console.log('Error while saving vehicle collections',err)
                    res.send(err)
                })
            }
        })
        .catch(err => {
            console.log('Error while finding similar vehicle numbers in DB',err);
            res.send(err)
        })

})
module.exports = vehicleRoute