// Middleware de validation des données.
// TODO: Connecter les schémas de validation des modules.
module.exports = (schema) => (req, res, next) => {
  if (!schema) return next();
  next();
};
