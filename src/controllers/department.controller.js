const crypto = require('crypto');

exports.listDepartments = async (req, res, next) => {
  try {
    return res.status(200).json({
      data: []
    });
  } catch (error) {
    next(error);
  }
};

exports.createDepartment = async (req, res, next) => {
  try {
    const { name, parent_id } = req.body;
    return res.status(201).json({
      id: crypto.randomUUID(),
      name,
      parent_id: parent_id || null
    });
  } catch (error) {
    next(error);
  }
};

exports.updateDepartment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, parent_id } = req.body;
    return res.status(200).json({
      id,
      name,
      parent_id: parent_id || null
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteDepartment = async (req, res, next) => {
  try {
    const { id } = req.params;
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};