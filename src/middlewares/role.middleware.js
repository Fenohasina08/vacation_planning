// Vérification des rôles : employee, manager, hr, director, platform.
module.exports = (...allowedRoles) => (req, res, next) => {
  if (!req.user || !allowedRoles.includes(req.user.role)) {
    return res.status(403).json({
      type: 'about:blank',
      title: 'Forbidden',
      status: 403,
      detail: 'Permission insuffisante.'
    });
  }

  next();
};
