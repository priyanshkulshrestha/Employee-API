//Importing MODULES
const express = require("express");
const app = express();
const mongoose = require('mongoose')
require('dotenv').config(); // For setting Enviroment Variables

// connection with db
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
})

const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('conected to db'))

// for checking Server
// app.get("/",(req,res) => {
//     res.send("hello techCompiler")
// })

app.use(express.json()); // middleware to parse req to JSON 

// importing routes
const employeeRouter = require('./routes/employee')
app.use('/employee', employeeRouter)

// setting port
app.listen(3000 || process.env.PORT, () => {
    console.log(`app is listening on port ${process.env.PORT}`)
})