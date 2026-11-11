const { Router } = require('express');
const leaveTypeController = require('../controllers/leave-type.controller');

const router = Router();

router.get('/', leaveTypeController.listLeaveTypes);
router.post('/', leaveTypeController.createLeaveType);
router.patch('/:id', leaveTypeController.updateLeaveType);
router.get('/:id/policies', leaveTypeController.listLeavePolicies);
router.post('/:id/policies', leaveTypeController.createLeavePolicy);

module.exports = router;