const express = require('express')
const router = express.Router()
const Employee = require('../models/employee')


//getting all employee 
// ************ Using GET REQUEST ***************
router.get('/', async(req, res) => {
    try{
        const employees = await Employee.find()
        res.json(employees) 
    }catch (err) {
        res.status(500).json({message: err.message})
    }
})

//Creating one employee
// ************ Using POST REQUEST ***************
router.post("/", async (req, res) => { 
	try {
		const employee = await Employee.findOne({ name: req.body.name });
		if (employee)
			return res.status(409).send({ message: "employee with given name already Exist!" });


		await new Employee({ ...req.body}).save();
		res.status(201).send({ message: "employee created successfully" });
	} catch (error) {
		console.log(error)
		res.status(500).send({ message: "Internal Server Error" });
	}
});

//updating one employee
// ************ Using PATCH REQUEST ***************
router.patch('/:id', getEmployee, async(req, res) => {
    if(req.body.name != null){
        const employee = await Employee.findOne({ name: req.body.name });
		if (employee)
			return res.status(409).send({ message: "employee with given name already Exist!" });
        res.employee.name = req.body.name
    }
    if(req.body.dep != null){
        res.employee.dep = req.body.dep
    }
    if(req.body.salary != null){
        res.employee.salary = req.body.salary
    }
    try{
        const updatedEmployee = await res.employee.save()
        res.json(updatedEmployee)
    } catch(err) {
        res.status(400).json({message : err.message})
    }
})


//deleting one employee
// ************ Using DELETE REQUEST ***************
router.delete('/:id', getEmployee, async (req, res) => {
    try{
        await res.employee.remove()
        res.json({ message: 'deleted employee'})
    }
    catch (err){
        res.status(500).json({ message: err.message })
    }
})

// ************ FUNCTION TO FIND Employee by ID ***************
async function getEmployee(req, res, next){
    let employee
    try{
        employee = await Employee.findById(req.params.id)
        if(employee == null){
            return res.status(404).json({message: "cannot find this employee"})
        }
    } catch(err){
        return res.status(500).json({message: err.message})
    }
    res.employee = employee
    next()
}

module.exports = router