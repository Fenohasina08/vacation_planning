const { Router } = require('express');
const authController = require('../controllers/auth.controller');

const router = Router();

router.post('/register-company', authController.registerCompany);
router.post('/verify-email', authController.verifyEmail);
router.post('/login', authController.login);
router.post('/login/verify-otp', authController.verifyLoginOtp);
router.post('/logout', authController.logout);
router.post('/logout-all', authController.logoutAll);
router.post('/password/forgot', authController.forgotPassword);
router.post('/password/reset', authController.resetPassword);
router.post('/invitations/accept', authController.acceptInvitation);
router.get('/memberships', authController.listMemberships);
router.post('/select-company', authController.selectCompany);

module.exports = router;