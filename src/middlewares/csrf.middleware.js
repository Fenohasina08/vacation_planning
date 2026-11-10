// Protection CSRF pour les requêtes qui modifient les données.
// TODO: Comparer le jeton CSRF de la session avec X-CSRF-Token.
module.exports = (req, res, next) => {
  next();
};
