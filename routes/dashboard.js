const dashRoute = require('express').Router()
const memo = require('../model/memo_model')
const yearly = require('../model/yearly_model')
const bodyparser = require('body-parser')

dashRoute.use(bodyparser.json())

// Adding yearly data to particular vehicle using ID
dashRoute.post('/addyear', (req, res) => {
    console.log(req.body)
    yearly.updateOne({vehicle_id : req.body.id}, { 
        $push : {
            yearly_Det : req.body.values
        }
     })
     .then(yres => {
         console.log(yres)
     })
     .catch(err => {
         console.log(err)
     })
})

// Getting yearly details
dashRoute.get('/getyearinfo/:id', (req, res) => {
    const id = req.params.id

    yearly.findOne({vehicle_id : id})
    .then(dbres => {
        console.log("Yearly details fethced is ", dbres)
        if(dbres)
        {
            res.send(dbres)
        }
        else
        {
            res.status(401).send({msg : "No yearly details"})
        }
    })
    .catch(err => {
        console.log(err)
        res.end()
    })
})

// Sending memo of particular year
dashRoute.get('/get/:id/:year', (req, res) => {
    const year = req.params.year
    const id = req.params.id

    console.log(year, id)

    memo.findOne({vehicle_id : id}, { "Memo.calc_date" : 1, "Memo.final_balance.hands_on" : 1, "Memo.trip_expense" : 1, _id : 1 })
    .then(mres => {
        var sendMemObj = []
        var sendYearObj = {}
        var handson = 0
        var exp = 0

        // console.log(mres)
        if(mres)
        {
            for (let i = 0; i < mres.Memo.length; i++) {
                const obj = mres.Memo[i];
                // console.log(typeof( new Date(obj.calc_date).getFullYear()))
                if(parseInt(year) === new Date(obj.calc_date).getFullYear())
                {
                    const sub_array = []
                    sub_array.push(obj.calc_date)                   // To create sub Array
                    sub_array.push(obj.final_balance.hands_on)
                    sendMemObj.push(sub_array)
                    // console.log("Array : ", sendObj)

                    handson += obj.final_balance.hands_on
                    // console.log(obj.trip_expense)
                    exp += parseInt(obj.trip_expense)
                }
            }
            
            yearly.findOne({vehicle_id : id})
            .then(yeres => {
                if(yeres)
                {
                    // console.log(yeres)
                    for (let i = 0; i < yeres.yearly_Det.length; i++) {
                        const obj = yeres.yearly_Det[i]

                        if(parseInt(year) === parseInt(obj.year))
                        {
                            sendYearObj = obj
                            break
                        }
                    }
                    res.send({memos : sendMemObj, year_det : sendYearObj, hand_on : handson, t_exp : exp,})
                } 
            })
            .catch(err => {
                console.log("Error while getting yearly details of particular vehicle ", err)
                res.end()
            })

        }
        else{
            res.send({msg : "No memo found", flag : true})
        }
    })
    .catch(err => {
        console.log('Memo found error',err)
        res.send(err)
    })
})

// Sending chart data
dashRoute.get('/getmonthdata/:id', (req, res) => {
    const id = req.params.id

    memo.findOne({vehicle_id : id}, { "Memo.calc_date" : 1, "Memo.final_balance" : 1, "Memo.trip_expense" : 1, _id : 1 })
    .then(dres => {
        // Array Object to send
        var sendObj = []
        var yearArray = []
        var handson = 0
        var exp = 0
        var yearObj = null

        // console.log(dres)
        const year = new Date().getFullYear()
        if(dres)
        {
            for (let i = 0; i < dres.Memo.length; i++) {
                const obj = dres.Memo[i];

                // console.log(obj.final_balance)
                if(year === new Date(obj.calc_date).getFullYear())
                {
                    const sub_array = []
                    sub_array.push(obj.calc_date)                   // To create sub Array
                    sub_array.push(obj.final_balance.hands_on)
                    sendObj.push(sub_array)

                    handson += obj.final_balance.hands_on
                    // console.log(obj.trip_expense)
                    exp += parseInt(obj.trip_expense)
                }
            }

            // console.log("Yearly hand on  : ", handson, "yearly trip expense : ", exp)

            // Finds the Yearly details
            yearly.findOne({vehicle_id : id})
            .then(yres => {
                if(yres)
                {
                    // console.log(yres)
                    for (let i = 0; i < yres.yearly_Det.length ; i++) {
                        const obj = yres.yearly_Det[i];
                        
                        yearArray.push(obj.year)
                        if(year === parseInt(obj.year))
                        {
                            yeardiv = true
                            yearObj = obj
                            // console.log("Yearly object : ",yearObj)
                        }
                    }
                
                    res.send({memoarray : sendObj, years : yearArray, 
                        yeardata : yearObj, hand_on : handson, t_exp : exp,
                        msg : "Memo found"})
                }
                else{
                    console.log("error is on year api")
                    res.send({msg : "couldn't find year", flag : true})
                }
            })
        }
        else
        {
            res.send({msg : "No memo found", flag : true})
        }
    })
    .catch(err => {
        console.log('Memo found error',err)
        res.send(err)
    })
})

module.exports = dashRoute

// // Deleting Yearly details
// dashRoute.delete('/delete/:id', (req, res) => {
//     const id = req.params.id

//     console.log("ID to be deleted : ",id)
//     yearly.deleteOne({"yearly_Det._id" : id})
//     .then(del => {
//         if(del)
//         {
//             console.log(del)
//             res.send({msg : "Deleted Successfully"})
//         }
//     })
//     .catch(err => {
//         res.send(err)
//     })
// })
