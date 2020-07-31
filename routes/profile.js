const profileRoute = require('express').Router()
const bodyparser = require('body-parser')
const profile = require("../model/profile.model")

profileRoute.use(bodyparser.json())
profileRoute.get('/getuser', (req, res) => {
    profile.findOne({firstname : "Boopalan"})
    .then(result => {
        if(result)
            res.status(200).send(result)
        else
        {
            console.log("error")
            res.end()
        }
    })
})

module.exports = profileRoute