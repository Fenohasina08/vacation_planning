const { Router } = require('express');
const companyController = require('../controllers/company.controller');

const router = Router();

router.get('/', companyController.getCompany);
router.patch('/', companyController.updateCompany);
router.get('/settings', companyController.getCompanySettings);
router.patch('/settings', companyController.updateCompanySettings);
router.get('/holidays', companyController.listHolidays);
router.post('/holidays', companyController.createHoliday);
router.delete('/holidays/:id', companyController.deleteHoliday);

module.exports = router;