const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose');

const profiles = require('./routes/profile');
const keys = require('./config/key');
const port = process.env.PORT || 3001
// Mongoose connection
mongoose.connect(keys.mongodb.dbURI, {useNewUrlParser: true, useUnifiedTopology: true }, (err, result) => {
    if(err)
        console.log('Database server not connected Successfully' + err)
    else
        console.log('Database server connected Successfully'+ result )
})
app.use(morgan("dev"))

app.use('/user', profiles)

app.listen(port, () => console.log("Server is running at PORT ===" + port))