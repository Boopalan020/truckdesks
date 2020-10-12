const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')

const driver = require('./routes/drivers')
const vehicle = require('./routes/vehicles')
const memo = require('./routes/memo')

const keys = require('./config/key')
const port = process.env.PORT || 3001
// Mongoose connection
mongoose.connect(keys.mongodb.dbURI, {useNewUrlParser: true, useUnifiedTopology: true }, (err, result) => {
    if(err)
        console.log('Database server not connected Successfully' + err)
    else
        console.log('Database server connected Successfully' )
})
app.use(morgan("dev"))
app.use(cors({
    origin : "http://localhost:3000"
}))

app.use('/drivers', driver)
app.use('/vehicle', vehicle)
app.use('/memo', memo)

app.listen(port, () => console.log("Server is running at PORT ===" + port))