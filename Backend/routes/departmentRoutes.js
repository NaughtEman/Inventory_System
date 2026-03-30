const express = require('express');
const controller = require("../controllers/departmentController");
const router = express.Router();

// GET all departments
router.get('/', controller.getAllDepartments);

// GET department by ID
router.get('/:id', controller.getDepartmentById);

// POST create new department
router.post('/', controller.createDepartment);

// PUT update department
router.put('/:id', controller.updateDepartment);

// DELETE department
router.delete('/:id', controller.deleteDepartment);

module.exports = router;