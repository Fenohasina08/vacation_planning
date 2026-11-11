const crypto = require('crypto');

exports.registerCompany = async (req, res, next) => {
  try {
    const { company_name, first_name, last_name, email, password, country_code } = req.body;
    return res.status(202).json({
      message: "Email de vérification envoyé"
    });
  } catch (error) {
    next(error);
  }
};

exports.verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.body;
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const challengeId = crypto.randomUUID();
    return res.status(200).json({
      challenge_id: challengeId
    });
  } catch (error) {
    next(error);
  }
};

exports.verifyLoginOtp = async (req, res, next) => {
  try {
    const { challenge_id, code } = req.body;
    const csrfToken = crypto.randomUUID();

    res.cookie('session_token', 'mock_secure_session_cookie', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });

    return res.status(200).json({
      company_selection_required: true,
      csrf_token: csrfToken
    });
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    res.clearCookie('session_token');
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

exports.logoutAll = async (req, res, next) => {
  try {
    res.clearCookie('session_token');
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    return res.status(202).send();
  } catch (error) {
    next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { token, new_password } = req.body;
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

exports.acceptInvitation = async (req, res, next) => {
  try {
    const { token, password } = req.body;
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

exports.listMemberships = async (req, res, next) => {
  try {
    return res.status(200).json({
      data: []
    });
  } catch (error) {
    next(error);
  }
};

exports.selectCompany = async (req, res, next) => {
  try {
    const { employee_id } = req.body;
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    return res.status(200).json({
      id: crypto.randomUUID(),
      email: "user@example.com",
      first_name: "Jean",
      last_name: "Dupont",
      active_company_id: crypto.randomUUID(),
      role: "hr"
    });
  } catch (error) {
    next(error);
  }
};