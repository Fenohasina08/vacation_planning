// Vérifie la session utilisateur.
// TODO: Lire et vérifier le cookie de session HttpOnly.
module.exports = (req, res, next) => {
  // Ne pas faire confiance à un user_id envoyé par le client.
  next();
};
