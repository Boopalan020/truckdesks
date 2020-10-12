const memoRoute = require('express').Router()
const memo = require('../model/memo_model')
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
    console.log(recv)

    vehicle.findOne({vehicle_no : recv.vehicle_no})
    .then(result => {
        console.log(result)
        if(result)
        {
            console.log("Vehicle Found!!! Saving Memo...")
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