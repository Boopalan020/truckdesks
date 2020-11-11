const driverRoute = require('express').Router()
const driver = require('../model/driver_model')
const bodyparser = require('body-parser')

driverRoute.use(bodyparser.json())
// This will fetch all drivers from  the dataBase
driverRoute.get('/', (req, res) => {
    console.log("getting the data from driver collections")
    driver.find()
    .then(results => {
        res.status(200).send(results)
    })
    .catch(err => {
        console.log(err)
    })
})
// Getting driver by ID
driverRoute.get('/editdriver/:id', (req, res) => {
    const id = req.params.id
    driver.findOne({_id : id})
    .then(dres => {
        if(dres)
        {
            console.log("Driver details ",dres)
            res.status(200).send(dres)
        }
    })
    .catch(err => {
        console.log(err)
    })
})
// Updating diver details
driverRoute.post('/updatedriver', (req, res) => {
    const id = req.body._id
    driver.updateOne({ _id : id }, {
        $set : {
            address : req.body.address,
            phone : req.body.phone,
            insure_no  : req.body.insure_no,
        }
    })
    .then(dres => {
        // console.log(dres)
        res.status(200).send({msg : "Details Updated"})
    })
    .catch(err => {
        console.log(err)
        res.send(err)
    })
})
// Deleting driver from DB
driverRoute.delete('/deletedriver', (req, res) => {
    console.log(req.body.id)
    driver.deleteOne({license : req.body.id})
    .then(result => {
        console.log(result)
        if(result)
        {
            console.log("Deleted Succesfully")
            res.status(200).send({msg : "Deleted Succesfully"})
        }
            
    })
    .catch(err => {
        console.log(err)
        res.send(err)
    })
})
// This will insert the sriver details which is not inside the DataBase
driverRoute.post('/adddriver', (req, res) => {
    driver.findOne({license : req.body.license})
    .then(result => {
        if(result)
        {
            console.log("Already exist : ")
            res.send({flag : "exist", msg: "Driver Already Exist"})
        }
        else
        {
            console.log("Creating driver Space ")
            new driver({
                drivername : req.body.drivername,
                license : req.body.license,
                blood : req.body.blood,
                address : req.body.address,
                age : req.body.age,
                phone : req.body.phone,
                insure_no  : req.body.insure_no,
            }).save()
            .then(result => {
                if(result)
                {
                    console.log("Driver Space created Successfully")
                    res.status(200).send({flag : "new", msg :"Saved Successfully"})
                }
            })
            .catch(err => {
                console.log(err)
                res.send(err);
            });
        }
    })
    .catch(err => {
        console.log(err)
        res.send(err)
    });
})
module.exports = driverRoute