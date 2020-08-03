const driverRoute = require('express').Router()
const driver = require('../model/driver.model')
const bodyparser = require('body-parser')

driverRoute.use(bodyparser.json())
// This will fetch all drivers from  the dataBase
driverRoute.get('/', (req, res) => {
    console.log("getting the data from driver collections")
    driver.find()
    .then(results => {
        console.log(results)
        res.status(200).send(results)
    })
    .catch(err => {
        console.log(err)
    })
})
// This will insert the sriver details which is not inside the DataBase
driverRoute.post('/adddriver', (req, res) => {
    console.log(req.body)
    driver.findOne({license : req.body.license})
    .then(result => {
        if(result)
        {
            console.log("Driver Already exist : ", result)
            res.status(200).end()
        }
        else
        {
            console.log("Creating driver Space ")
            new driver({
                drivername : req.body.drivername,
                license : req.body.license,
                address : req.body.address,
                phone : req.body.phone,
            }).save()
            then(result => {
                if(result)
                {
                    console.log("Driver Space created Successfully")
                    res.status(200).send(result)
                }
            })
            .catch(err => {
                console.log(err)
            });
        }
    })
    .catch(err => {
        console.log(err)
    });
})
module.exports = driverRoute