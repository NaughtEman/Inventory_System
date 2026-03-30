const Department = require("../models/Department");

//Create Department
exports.createDepartment = async (req, res) => {
  try {
    const department = await Department.create(req.body);
    res.json(department);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update Department
exports.updateDepartment = async (req,res) => {
    try {
        const { description } = req.body;
        const department = await Department.findByIdAndUpdate(
            req.params.id,
            { description },
            { new: true }
        );
        res.json(department);
    }catch (err) {
        res.status(400).json({ error: err.message });
    }
}

// GET all departments
exports.getAllDepartments = async (req,res) => {
    try{
        const department = await Department.find();
        res.json(department);
    }catch (err){
        res.status(400).json({error: err.message});
    }
}

// GET department by ID
exports.getDepartmentById = async (req,res) => {
    try {
        const department = await Department.findById(req.params.id);

        if (!department) {
            return res.status(404).json({ message: "This department doesn't exist" });
        }

        res.json(department);
    } catch (err) {
        res.status(400).json({error: err.message})
    }
}

// DELETE department
exports.deleteDepartment = async (req,res) => {
    try {
        const department = await Department.findByIdAndDelete(req.params.id);

        if (!department) {
            return res.status(404).json({ message: "This department doesn't exist" });
        }

        res.json({ message: "Department deleted successfully" });
    } catch (err) {
        res.status(400).json({error: err.message})
    }
}