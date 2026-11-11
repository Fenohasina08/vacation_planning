const { Router } = require('express');
const employeeController = require('../controllers/employee.controller');

const router = Router();

router.get('/', employeeController.listEmployees);
router.post('/', employeeController.createEmployee);
router.get('/:id', employeeController.getEmployee);
router.patch('/:id', employeeController.updateEmployee);
router.post('/:id/deactivate', employeeController.deactivateEmployee);
router.post('/:id/reactivate', employeeController.reactivateEmployee);
router.post('/:id/invitations', employeeController.resendInvitation);
router.post('/imports', employeeController.createEmployeeImport);
router.get('/imports/:id', employeeController.getEmployeeImport);
router.post('/imports/:id/commit', employeeController.commitEmployeeImport);

module.exports = router;