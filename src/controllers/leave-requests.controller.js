const crypto = require('crypto');

exports.listLeaveRequests = async (req, res, next) => {
  try {
    const { limit, cursor, employee_id, status, from, to } = req.query;
    return res.status(200).json({
      data: [],
      next_cursor: null
    });
  } catch (error) {
    next(error);
  }
};

exports.createLeaveRequest = async (req, res, next) => {
  try {
    const { leave_type_id, start_date, end_date, reason } = req.body;
    return res.status(201).json({
      id: crypto.randomUUID(),
      employee_id: crypto.randomUUID(),
      leave_type_id,
      start_date,
      end_date,
      status: "pending",
      reason: reason || null
    });
  } catch (error) {
    next(error);
  }
};

exports.getLeaveRequest = async (req, res, next) => {
  try {
    const { id } = req.params;
    return res.status(200).json({
      id,
      employee_id: crypto.randomUUID(),
      leave_type_id: crypto.randomUUID(),
      start_date: "2026-06-01",
      end_date: "2026-06-05",
      status: "pending",
      reason: null
    });
  } catch (error) {
    next(error);
  }
};

exports.cancelLeaveRequest = async (req, res, next) => {
  try {
    const { id } = req.params;
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

exports.listPendingValidations = async (req, res, next) => {
  try {
    const { limit, cursor } = req.query;
    return res.status(200).json({
      data: [],
      next_cursor: null
    });
  } catch (error) {
    next(error);
  }
};

exports.decideValidation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { decision, comment } = req.body;
    return res.status(200).json({
      id,
      employee_id: crypto.randomUUID(),
      leave_type_id: crypto.randomUUID(),
      start_date: "2026-06-01",
      end_date: "2026-06-05",
      status: decision === "approved" ? "approved" : "rejected"
    });
  } catch (error) {
    next(error);
  }
};

exports.getMyBalances = async (req, res, next) => {
  try {
    return res.status(200).json({
      data: []
    });
  } catch (error) {
    next(error);
  }
};