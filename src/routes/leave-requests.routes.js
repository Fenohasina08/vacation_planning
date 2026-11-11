const { Router } = require('express');
const leaveRequestController = require('../controllers/leave-request.controller');

const router = Router();

router.get('/leave-requests', leaveRequestController.listLeaveRequests);
router.post('/leave-requests', leaveRequestController.createLeaveRequest);
router.get('/leave-requests/:id', leaveRequestController.getLeaveRequest);
router.delete('/leave-requests/:id', leaveRequestController.cancelLeaveRequest);
router.get('/validations', leaveRequestController.listPendingValidations);
router.post('/validations/:id/decide', leaveRequestController.decideValidation);
router.get('/balances', leaveRequestController.getMyBalances);

module.exports = router;