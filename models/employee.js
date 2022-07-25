// importing mongoose for defining schema
const mongoose = require('mongoose')

// Schema
const employeeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    dep: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("Employee", employeeSchema)