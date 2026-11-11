const EmployeeStatus = Object.freeze({
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING_INVITATION: 'pending_invitation'
});

const LeaveRequestStatus = Object.freeze({
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  CANCELLED: 'cancelled'
});

const Roles = Object.freeze({
  EMPLOYEE: 'employee',
  MANAGER: 'manager',
  HR: 'hr',
  DIRECTOR: 'director',
  PLATFORM: 'platform'
});

module.exports = {
  EmployeeStatus,
  LeaveRequestStatus,
  Roles
};