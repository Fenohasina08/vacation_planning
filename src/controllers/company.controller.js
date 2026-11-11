const crypto = require('crypto');

exports.getCompany = async (req, res, next) => {
  try {
    return res.status(200).json({
      id: crypto.randomUUID(),
      name: "IT Solution",
      country_code: "MG",
      timezone: "Indian/Antananarivo"
    });
  } catch (error) {
    next(error);
  }
};

exports.updateCompany = async (req, res, next) => {
  try {
    const { name, country_code, timezone } = req.body;
    return res.status(200).json({
      id: crypto.randomUUID(),
      name: name || "IT Solution",
      country_code: country_code || "MG",
      timezone: timezone || "Indian/Antananarivo"
    });
  } catch (error) {
    next(error);
  }
};

exports.getCompanySettings = async (req, res, next) => {
  try {
    return res.status(200).json({
      working_days: ["monday", "tuesday", "wednesday", "thursday", "friday"]
    });
  } catch (error) {
    next(error);
  }
};

exports.updateCompanySettings = async (req, res, next) => {
  try {
    const { working_days } = req.body;
    return res.status(200).json({
      working_days: working_days || ["monday", "tuesday", "wednesday", "thursday", "friday"]
    });
  } catch (error) {
    next(error);
  }
};

exports.listHolidays = async (req, res, next) => {
  try {
    const { year } = req.query;
    return res.status(200).json({
      data: []
    });
  } catch (error) {
    next(error);
  }
};

exports.createHoliday = async (req, res, next) => {
  try {
    const { date, name } = req.body;
    return res.status(201).json({
      id: crypto.randomUUID(),
      date,
      name
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteHoliday = async (req, res, next) => {
  try {
    const { id } = req.params;
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};