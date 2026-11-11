const { Router } = require('express');
const departmentController = require('../controllers/department.controller');

const router = Router();

router.get('/', departmentController.listDepartments);
router.post('/', departmentController.createDepartment);
router.patch('/:id', departmentController.updateDepartment);
router.delete('/:id', departmentController.deleteDepartment);

module.exports = router;