const crypto = require('crypto');

exports.listLeaveTypes = async (req, res, next) => {
  try {
    const { active_only } = req.query;
    return res.status(200).json({
      data: []
    });
  } catch (error) {
    next(error);
  }
};

exports.createLeaveType = async (req, res, next) => {
  try {
    const { name } = req.body;
    return res.status(201).json({
      id: crypto.randomUUID(),
      name,
      is_active: true
    });
  } catch (error) {
    next(error);
  }
};

exports.updateLeaveType = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, is_active } = req.body;
    return res.status(200).json({
      id,
      name,
      is_active
    });
  } catch (error) {
    next(error);
  }
};

exports.listLeavePolicies = async (req, res, next) => {
  try {
    const { id } = req.params;
    return res.status(200).json({
      data: []
    });
  } catch (error) {
    next(error);
  }
};

exports.createLeavePolicy = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rule_name } = req.body;
    return res.status(201).json({
      id: crypto.randomUUID(),
      rule_name
    });
  } catch (error) {
    next(error);
  }
};