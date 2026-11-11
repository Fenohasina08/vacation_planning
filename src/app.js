const express = require('express');
const authRoutes = require('./routes/auth.routes');
const companyRoutes = require('./routes/company.routes');
const errorHandler = require('./middlewares/error.middleware');
const departmentRoutes = require('./routes/department.routes');
const employeeRoutes = require('./routes/employee.routes');
const leaveTypeRoutes = require('./routes/leave-type.routes');
const leaveRequestRoutes = require('./routes/leave-request.routes');
const authController = require('./controllers/auth.controller');

const app = express();

app.use(express.json());

app.get('/v1/health', (req, res) => {
  res.status(200).json({ status: 'ok', version: '0.1.0' });
});

app.get('/v1/me', authController.getMe);

app.use('/v1/auth', authRoutes);
app.use('/v1/company', companyRoutes);
app.use('/v1/departments', departmentRoutes);
app.use('/v1/employees', employeeRoutes);
app.use('/v1/leave-types', leaveTypeRoutes);
app.use('/v1', leaveRequestRoutes);

app.use(errorHandler);

module.exports = app;